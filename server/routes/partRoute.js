const express = require("express");
const partController = require('../controllers/partController')
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');
 
router.get("/getAllParts", partController.getAllParts)
router.post("/getPartsByPlant", partController.getPartsByPlant)
router.get("/getPartById/:id", partController.getPartById)
router.post("/createPart", partController.createPart)
router.put("/updatePart/:id", partController.updatePart)
router.delete("/deletePart", partController.deletePart)
router.post("/uploadPartInExcel", upload, partController.uploadPartInExcel)

module.exports = router;