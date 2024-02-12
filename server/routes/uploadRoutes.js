const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const fs = require('fs')
const dayjs = require('dayjs')

const createDiskStorage = (destinationFolder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {

      cb(null, `storage/${destinationFolder}`);
    },
    filename: (req, file, cb) => {

      cb(null, dayjs().format('YYYY-MM-DD') + file.originalname);
    },
  });
};

const createAdditionalStorage = (destinationFolder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {

      cb(null, `storage/${destinationFolder}`);
    },
    filename: (req, file, cb) => {

      cb(null, file.originalname);
    },
  });
};



const ItemImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/Images/itemMasterImages'); // Specify the folder where images will be stored
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, dayjs().format('YYYY-MM-DD') + file.originalname); // Rename the uploaded image file
  },
});

const calCertificateStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/calCertificates'); // Specify the folder where images will be stored
  },
  filename: (req, file, cb) => {
    // Use calCertificateNo from the request body to set the filename
    console.log(req.body)

    cb(null, file.originalname); // Set the filename
  },
});

const VendorCertificateStorage = createAdditionalStorage('vendorCertificates');
const WorkInstructionStorage = createDiskStorage('workInstructions');
const itemCertificateStorage = createDiskStorage('itemCertificates');
const additionalCertificateStorage = createAdditionalStorage('additionalCertificates');
const logoStorage = createDiskStorage('logo');
// const grnItemCertificates = createDiskStorage('grnItemCertificates');




const vendorCertificateUpload = multer({ storage: VendorCertificateStorage });
const workInsUploadFolder = multer({ storage: WorkInstructionStorage });
const itemCertificateFolder = multer({ storage: itemCertificateStorage });
const calCertificateFolder = multer({ storage: calCertificateStorage });
const additionalCertificateFolder = multer({ storage: additionalCertificateStorage });
const logoFolder = multer({ storage: logoStorage });

// const grnItemCertificateFolder = multer({ storage: grnItemCertificates });
const itemMasterImagesFolder = multer({ storage: ItemImageStorage });

router.post('/itemMasterImage', itemMasterImagesFolder.single('image'), (req, res) => {
  if (!req.file) {
    // No file was provided in the request
    return res.status(400).json({ error: 'No image selected for upload' });
  }

  // File was provided, proceed with processing
  res.status(200).json({ message: 'Item Image uploaded successfully', name: req.file.filename });
});


router.post('/VendorCertificateUpload', vendorCertificateUpload.single('file'), (req, res) => {
  if (!req.file) {
    // No file was provided in the request
    return res.status(400).json({ error: 'No file selected for upload' });
  }

  // File was provided, proceed with processing
  res.status(200).json({ message: 'Vendor Certificate uploaded successfully', name: req.file.filename });
});

// router.post('/grnItemCertificateUp', grnItemCertificateFolder.single('file'), (req, res) => {
//   if (!req.file) {
//     // No file was provided in the request
//     return res.status(400).json({ error: 'No file selected for upload' });
//   }

//   // File was provided, proceed with processing
//   res.status(200).json({ message: 'Grn Cal Certificate uploaded successfully', name: req.file.filename });
// });

router.post('/VendorCertificateUpload', vendorCertificateUpload.single('file'), (req, res) => {
  if (!req.file) {
    // No file was provided in the request
    return res.status(400).json({ error: 'No file selected for upload' });
  }

  fs.renameSync(req.file.path, req.file.path.replace(req.file.originalname,
    req.body.certificate + path.extname(req.file.originalname)));
  console.log(req.file)
  console.log(" Uploaded Successfully")

  // File was provided, proceed with processing

  res.status(200).json({ message: 'Calibration Report uploaded successfully', name: `${req.body.certificate}.pdf` });
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
  res.status(200).json({ message: 'Work Instruction uploaded successfully', name: req.file.filename });
});

router.post('/itemCertificates', itemCertificateFolder.single('file'), (req, res) => {
  if (!req.file) {
    // No file was provided in the request
    return res.status(400).json({ error: 'No file selected for upload' });
  }

  // File was provided, proceed with processing
  res.status(200).json({ message: 'Item Certificate uploaded successfully', name: req.file.filename });
});

router.post('/calReportUpload', calCertificateFolder.single('file'), (req, res) => {
  const { calCertificateNo } = req.body;
  if (!req.file) {
    // No file was provided in the request
    return res.status(400).json({ error: 'No file selected for upload' });
  }
  console.log(req.file)

  fs.renameSync(req.file.path, req.file.path.replace(req.file.originalname,
    req.body.calCertificateNo + path.extname(req.file.originalname)));
  console.log(req.file)
  console.log("Report Uploaded Successfully")
  // File was provided, proceed with processing
  res.status(200).json({ message: 'Calibration Report uploaded successfully', name: `${req.body.calCertificateNo}.pdf` });
});

router.post('/additionalCertificates', additionalCertificateFolder.single('file'), (req, res) => {
  if (!req.file) {
    // No file was provided in the request
    return res.status(400).json({ error: 'No file selected for upload' });
  }
  const fileName = req.body.rdName.replace(/\//g, '-')
  const newPath = req.file.path.replace(
    req.file.originalname,
    fileName + path.extname(req.file.originalname)
  );

  fs.renameSync(req.file.path, newPath);
  console.log(req.file)
  console.log("Additional Uploaded Successfully")
  res.status(200).json({ message: 'Calibration Report uploaded successfully', name: `${fileName}.pdf` });

  // File was provided, proceed with processing

});

router.post('/msaCertificates', additionalCertificateFolder.single('file'), (req, res) => {
  if (!req.file) {
    // No file was provided in the request
    return res.status(400).json({ error: 'No file selected for upload' });
  }

  const fileName = req.body.msaName.replace(/\//g, '-')
  const newPath = req.file.path.replace(
    req.file.originalname,
    fileName + path.extname(req.file.originalname)
  );

  fs.renameSync(req.file.path, newPath);
  console.log(req.file)
  console.log(" Uploaded Successfully")
  res.status(200).json({ message: 'Calibration Report uploaded successfully', name: `${fileName}.pdf` });

  // File was provided, proceed with processing

});


router.post('/otherFilesCertificates', additionalCertificateFolder.single('file'), (req, res) => {
  if (!req.file) {
    // No file was provided in the request
    return res.status(400).json({ error: 'No file selected for upload' });
  }

  const fileName = req.body.otherFile.replace(/\//g, '-')
  const newPath = req.file.path.replace(
    req.file.originalname,
    fileName + path.extname(req.file.originalname)
  );

  fs.renameSync(req.file.path, newPath);
  console.log(req.file)
  console.log("Additional Uploaded Successfully")
  res.status(200).json({ message: 'Calibration Report uploaded successfully', name: `${fileName}.pdf` });

  // File was provided, proceed with processing

});

router.post('/compLogoUpload', logoFolder.single('image'), (req, res) => {
  if (!req.file) {
    // No file was provided in the request
    return res.status(400).json({ error: 'No image selected for upload' });
  }

  // File was provided, proceed with processing
  res.status(200).json({ message: 'Logo uploaded successfully', name: req.file.filename });
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
