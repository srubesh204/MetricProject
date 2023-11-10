const express = require("express");
const itemMasterController = require('../controllers/itemMasterController')
const router = express.Router();
 
router.get("/getAllItemMasters", itemMasterController.getAllItemMasters)
router.post("/createItemMaster", itemMasterController.createItemMaster)
router.put("/updateItemMaster/:id", itemMasterController.updateItemMaster)
router.delete("/deleteItemMaster", itemMasterController.deleteItemMaster)

module.exports = router;