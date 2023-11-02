const express = require('express');
const multer = require('multer');
const router = express.Router();

const VendorCertificateStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/vendorCertificates');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const vendorCertificateUpload = multer({ storage: VendorCertificateStorage });

router.post('/VendorCertificateUpload', vendorCertificateUpload.single('file'), (req, res) => {
    if (!req.file) {
      // No file was provided in the request
      return res.status(400).json({ error: 'No file selected for upload' });
    }
  
    // File was provided, proceed with processing
    res.status(200).json({ message: 'Vendor Certificate uploaded successfully' });
  });

module.exports = router;
