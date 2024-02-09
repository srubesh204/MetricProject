const express = require("express");
const itemAddController = require('../controllers/itemAddController')
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');
 
router.get("/getAllItemAdds", itemAddController.getAllItemAdds)
router.get("/getItemAddById/:id", itemAddController.getItemAddById)
router.post("/getItemByPlant", itemAddController.getItemByPlant)
router.get("/getItemAddByIMTESort", itemAddController.getItemAddByIMTESort)
router.get("/getDistinctItemName", itemAddController.getDistinctItemName)
router.post("/getItemAddByName", itemAddController.getItemAddByName)
router.post("/createItemAdd", itemAddController.createItemAdd)
router.put("/updateItemAdd/:id", itemAddController.updateItemAdd) 
router.put("/changeDepartmentUpdate", itemAddController.changeDepartmentUpdate)
router.delete("/deleteItemAdd", itemAddController.deleteItemAdd)
router.get("/getDistinctItemDepartments", itemAddController.getDistinctItemDepartments)
router.post("/getItemAddByDepName", itemAddController.getItemAddByDepName)
router.post("/getitemAddMasterName", itemAddController.getitemAddMasterName)
router.get("/getAllDistinctItemName", itemAddController.getAllDistinctItemName)
router.get("/uploadItemAddExcelData", itemAddController.uploadItemAddExcelData)
router.post("/getItemAddByPlant", itemAddController.getItemAddByPlant)
router.put("/updateItemStatus", itemAddController.updateItemStatus)
router.post("/uploadItemAddInExcel", upload, itemAddController.uploadItemAddInExcel)
module.exports = router;
