const express = require("express");
const itemAddController = require('../controllers/itemAddController')
const router = express.Router();
 
router.get("/getAllItemAdds", itemAddController.getAllItemAdds)
router.get("/getItemAddById/:id", itemAddController.getItemAddById)
router.get("/getItemAddByIMTESort", itemAddController.getItemAddByIMTESort)
router.post("/createItemAdd", itemAddController.createItemAdd)
router.put("/updateItemAdd/:id", itemAddController.updateItemAdd)
router.delete("/deleteItemAdd", itemAddController.deleteItemAdd)

module.exports = router;