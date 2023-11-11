const express = require("express");
const areaController = require('../controllers/areaController')
const router = express.Router();
 
router.get("/getAllAreas", areaController.getAllAreas)
router.get("/getAreaById/:id", areaController.getAreaById)
router.post("/createArea", areaController.createArea)
router.put("/updateArea/:id", areaController.updateArea)
router.delete("/deleteArea", areaController.deleteArea)

module.exports = router;