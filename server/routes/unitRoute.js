const express = require("express");
const unitController = require('../controllers/unitController')
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');
 
router.get("/getAllUnits", unitController.getAllUnits)
router.get("/getUnitById/:id", unitController.getUnitById)
router.post("/createUnit", unitController.createUnit)
router.put("/updateUnit/:id", unitController.updateUnit)
router.delete("/deleteUnit", unitController.deleteUnit)
router.post("/uploadUnitInExcel", upload, unitController.uploadUnitInExcel)

module.exports = router;