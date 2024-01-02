const express = require("express");
const areaController = require('../controllers/areaController')
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');
 
router.get("/getAllAreas", areaController.getAllAreas)
router.get("/getAreaById/:id", areaController.getAreaById)
router.post("/createArea", areaController.createArea)
router.put("/updateArea/:id", areaController.updateArea)
router.delete("/deleteArea", areaController.deleteArea)
router.post("/uploadAreaInExcel", upload, areaController.uploadAreaInExcel)

module.exports = router;