const express = require("express");
const compDetailsController = require('../controllers/compDetailsController')
const router = express.Router();
 
router.get("/getAllCompDetails", compDetailsController.getAllCompDetails)
router.get("/getCompDetailsById/:id", compDetailsController.getCompDetailsById )
router.post("/createCompDetails", compDetailsController.createCompDetails)
router.put("/updateCompDetails/:id", compDetailsController.updateCompDetails)
router.delete("/deleteCompDetails", compDetailsController.deleteCompDetails)

 
module.exports = router;