const express = require("express");
const itemDcController = require('../controllers/itemDcController')
const router = express.Router();
 
router.post("/getAllItemDc", itemDcController.getAllItemDc)
router.get("/getNextDcNo", itemDcController.getNextDcNo )
router.get("/getItemDcById /:id", itemDcController.getItemDcById )
router.post("/createItemDc", itemDcController.createItemDc)
router.put("/updateItemDc/:id",itemDcController.updateItemDc)
router.delete("/deleteItemDc", itemDcController.deleteItemDc)


module.exports = router;