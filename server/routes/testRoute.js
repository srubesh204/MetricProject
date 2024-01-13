const express = require("express");
const designationController = require('../controllers/testController')
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');
 


router.post("/uploadTestData", upload, designationController.uploadTestData)
router.get("/changeDate", upload, designationController.changeDate)


module.exports = router;