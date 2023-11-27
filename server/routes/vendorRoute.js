const express = require("express");
const vendorController = require('../controllers/vendorController')
const router = express.Router();
 
router.get("/getAllVendors", vendorController.getAllVendors)
router.get("/getVendorById/:id", vendorController.getVendorById)
router.post("/createVendor", vendorController.createVendor)
router.put("/updateVendor/:id", vendorController.updateVendor)
router.delete("/deleteVendor", vendorController.deleteVendor)
router.get("/getAllVendorWithTypes", vendorController.getAllVendorWithTypes)



module.exports = router;