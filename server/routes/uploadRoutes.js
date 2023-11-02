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

const upload = multer ({ storage: VendorCertificateStorage });

router.post('/VendorCertificateUpload', upload.single('file'), (req, res) => {
  res.status(200).json({ message: 'Vendor Cerficate uploaded successfully' });
});

module.exports = router;
