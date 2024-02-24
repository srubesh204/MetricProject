const express = require("express");
const itemCalController = require('../controllers/itemCalController')
const router = express.Router();
 
router.get("/getAllItemCals", itemCalController.getAllItemCals)
router.post("/createItemCal", itemCalController.createItemCal)
router.put("/updateItemCal/:id", itemCalController.updateItemCal)
router.delete("/deleteItemCal", itemCalController.deleteItemCal)
router.get("/getAllDistinctCalNames", itemCalController.getAllDistinctCalNames)
router.get("/getNextCalNo", itemCalController.getNextCalNo)

 
module.exports = router;