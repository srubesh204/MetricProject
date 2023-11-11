const express = require("express");
const unitController = require('../controllers/unitController')
const router = express.Router();
 
router.get("/getAllUnits", unitController.getAllUnits)
router.get("/getUnitById/:id", unitController.getUnitById)
router.post("/createUnit", unitController.createUnit)
router.put("/updateUnit/:id", unitController.updateUnit)
router.delete("/deleteUnit", unitController.deleteUnit)

module.exports = router;