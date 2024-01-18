const express = require("express");
const testController = require('../controllers/testController')
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');
 


router.post("/uploadItemAddInExcel", upload, testController.uploadItemAddInExcel)
router.get("/getAllTest", upload, testController.getAllTest)


module.exports = router;