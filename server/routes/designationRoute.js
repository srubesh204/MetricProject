const express = require("express");
const designationController = require('../controllers/designationController')
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');
 
router.get("/getAllDesignations", designationController.getAllDesignations)
router.get("/getDesignationById/:id", designationController.getDesignationById)
router.post("/createDesignation", designationController.createDesignation)
router.put("/updateDesignation/:id", designationController.updateDesignation)
router.delete("/deleteDesignation", designationController.deleteDesignation)
router.post("/uploadDesignationsInExcel", upload, designationController.uploadDesignationsInExcel)
//router.get("/getDesignationByData/:id", designationController.getDesignationByData)
module.exports = router;