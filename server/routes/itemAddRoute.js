const express = require("express");
const itemAddController = require('../controllers/itemAddController')
const router = express.Router();
 
router.get("/getAllItemAdds", itemAddController.getAllItemAdds)
router.get("/getItemAddById/:id", itemAddController.getItemAddById)
router.get("/getItemAddByIMTESort", itemAddController.getItemAddByIMTESort)
router.get("/getDistinctItemName", itemAddController.getDistinctItemName)
router.post("/getItemAddByName", itemAddController.getItemAddByName)
router.post("/createItemAdd", itemAddController.createItemAdd)
router.put("/updateItemAdd/:id", itemAddController.updateItemAdd)
router.delete("/deleteItemAdd", itemAddController.deleteItemAdd)
router.get("/getDistinctItemDepartments", itemAddController.getDistinctItemDepartments)
router.post("/getItemAddByDepName", itemAddController.getItemAddByDepName)
router.post("/getitemAddMasterName", itemAddController.getitemAddMasterName)
 
module.exports = router;