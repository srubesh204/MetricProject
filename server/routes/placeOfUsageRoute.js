const express = require("express");
const placeOfUsageController = require('../controllers/placeOfUsageController')
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');
 
router.get("/getAllPlaceOfUsages",placeOfUsageController.getAllPlaceOfUsages)
router.get("/getPlaceOfUsageById/:id", placeOfUsageController.getPlaceOfUsageById)
router.post("/createPlaceOfUsage", placeOfUsageController.createPlaceOfUsage)
router.put("/updatePlaceOfUsage/:id",placeOfUsageController.updatePlaceOfUsage)
router.delete("/deletePlaceOfUsage", placeOfUsageController.deletePlaceOfUsage)
router.post("/uploadPlaceOfUsageInExcel", upload, placeOfUsageController.uploadPlaceOfUsageInExcel)

module.exports = router;