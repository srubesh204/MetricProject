const express = require("express");
const measurementUncertaintyController = require('../controllers/measurementUncertaintyController')
const router = express.Router();
router.get("/getAllMeasurementUncertainty",measurementUncertaintyController.getAllMeasurementUncertainty)
router.get("/getUncertaintyById/:id", measurementUncertaintyController.getUncertaintyById)
router.post("/createMeasurementUncertainty",measurementUncertaintyController.createMeasurementUncertainty)
router.put("/updateMeasurementUncertainty/:id", measurementUncertaintyController.updateMeasurementUncertainty)
module.exports = router;