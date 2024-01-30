const express = require("express");
const compDetailsController = require('../controllers/compDetailsController')
const plantsController = require('../controllers/plantsController')

const router = express.Router();
 
router.get("/getAllCompDetails", compDetailsController.getAllCompDetails)
router.get("/getCompDetailsById/:id", compDetailsController.getCompDetailsById )
router.post("/createCompDetails", compDetailsController.createCompDetails)
router.put("/updateCompDetails/:id", compDetailsController.updateCompDetails)
router.delete("/deleteCompDetails", compDetailsController.deleteCompDetails)

router.get("/getAllPlantDetails", plantsController.getAllPlantDetails)
router.get("/getPlantDetailsById/:id", plantsController.getPlantDetailsById )
router.post("/createPlantDetails", plantsController.createPlantDetails)
router.put("/updatePlantDetails/:id", plantsController.updatePlantDetails)
router.delete("/deletePlantDetails/:id", plantsController.deletePlantDetails)

 
module.exports = router;