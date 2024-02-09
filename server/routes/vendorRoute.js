const express = require("express");
const vendorController = require('../controllers/vendorController')
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');
 
router.get("/getAllVendors", vendorController.getAllVendors)
router.get("/getVendorById/:id", vendorController.getVendorById)
router.post("/createVendor", vendorController.createVendor)
router.post("/getVendorByPlants", vendorController.getVendorByPlants)
router.put("/updateVendor/:id", vendorController.updateVendor)
router.delete("/deleteVendor", vendorController.deleteVendor)
router.get("/getAllVendorWithTypes", vendorController.getAllVendorWithTypes)
router.post("/uploadVendorInExcel", upload, vendorController.uploadVendorInExcel)



module.exports = router;