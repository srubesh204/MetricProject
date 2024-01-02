const express = require("express");
const itemMasterController = require('../controllers/itemMasterController')
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');
 
router.get("/getAllItemMasters", itemMasterController.getAllItemMasters)
router.get("/getItemMasterById/:id", itemMasterController.getItemMasterById)
router.post("/createItemMaster", itemMasterController.createItemMaster)
router.put("/updateItemMaster/:id", itemMasterController.updateItemMaster)
router.delete("/deleteItemMaster", itemMasterController.deleteItemMaster)
router.post("/uploadItemMasterInExcel", upload, itemMasterController.uploadItemMasterInExcel)

module.exports = router;