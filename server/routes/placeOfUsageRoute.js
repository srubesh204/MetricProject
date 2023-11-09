const express = require("express");
const placeOfUsageController = require('../controllers/placeOfUsageController')
const router = express.Router();
 
router.get("/getAllPlaceOfUsages",placeOfUsageController.getAllPlaceOfUsages)
router.post("/createPlaceOfUsage", placeOfUsageController.createPlaceOfUsage)
router.put("/updatePlaceOfUsage/:id",placeOfUsageController.updatePlaceOfUsage)
router.delete("/deletePlaceOfUsage", placeOfUsageController.deletePlaceOfUsage)

module.exports = router;