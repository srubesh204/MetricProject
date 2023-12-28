const express = require("express");
const formatNoController = require('../controllers/formatNoController')
const router = express.Router();
 
router.get("/getAllFormatNo", formatNoController.getAllFormatNo)
router.get("/getFormatNoById/:id", formatNoController.getFormatNoById )
router.post("/createFormatNo", formatNoController.createFormatNo)
router.put("/updateFormatNo/:id", formatNoController.updateFormatNo)
router.delete("/deleteFormatNo", formatNoController.deleteFormatNo)

 
module.exports = router;