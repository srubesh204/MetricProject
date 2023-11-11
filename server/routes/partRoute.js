const express = require("express");
const partController = require('../controllers/partController')
const router = express.Router();
 
router.get("/getAllParts", partController.getAllParts)
router.get("/getPartById/:id", partController.getPartById)
router.post("/createPart", partController.createPart)
router.put("/updatePart/:id", partController.updatePart)
router.delete("/deletePart", partController.deletePart)

module.exports = router;