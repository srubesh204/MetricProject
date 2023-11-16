const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const VendorCertificateStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/vendorCertificates');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const WorkInstructionStorage =  multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/workInstructions');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const itemCertificateStorage =  multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/itemCertificates');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const vendorCertificateUpload = multer({ storage: VendorCertificateStorage });
const workInsUploadFolder = multer({ storage: WorkInstructionStorage });
const itemCertificateFolder = multer({ storage: itemCertificateStorage });

router.post('/VendorCertificateUpload', vendorCertificateUpload.single('file'), (req, res) => {
  if (!req.file) {
    // No file was provided in the request
    return res.status(400).json({ error: 'No file selected for upload' });
  }

  // File was provided, proceed with processing
  res.status(200).json({ message: 'Vendor Certificate uploaded successfully' });
});

router.get('/getVendorCertificate/:fileName', (req, res) => {
  const { fileName } = req.params;
  const fileURL = path.join(__dirname, '..', 'storage', 'vendorCertificates', fileName);
  console.log(fileURL);

  // Determine the appropriate content type based on the file extension
  const contentType = getContentType(fileName);

  // Set the appropriate content type in the response
  res.setHeader('Content-Type', contentType);

  // Stream the file to the response for viewing
  res.sendFile(fileURL, (err) => {
    if (err) {
      // Handle errors (e.g., file not found)
      res.status(404).json({ error: 'File not found' });
    }
  });
});

router.post('/workInstructions', workInsUploadFolder.single('file'), (req, res) => {
  if (!req.file) {
    // No file was provided in the request
    return res.status(400).json({ error: 'No file selected for upload' });
  }

  // File was provided, proceed with processing
  res.status(200).json({ message: 'Vendor Certificate uploaded successfully' });
});

router.post('/itemCertificates', itemCertificateFolder.single('file'), (req, res) => {
  if (!req.file) {
    // No file was provided in the request
    return res.status(400).json({ error: 'No file selected for upload' });
  }

  // File was provided, proceed with processing
  res.status(200).json({ message: 'Item Certificate uploaded successfully' });
});

// Function to determine the content type based on the file extension
function getContentType(fileName) {
  const fileExtension = path.extname(fileName);
  switch (fileExtension) {
    case '.pdf':
      return 'application/pdf';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    // Add more cases for other file types as needed
    default:
      return 'application/octet-stream'; // Default to binary data
  }
}


module.exports = router;
