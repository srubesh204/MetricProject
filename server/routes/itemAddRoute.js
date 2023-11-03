const express = require("express");
const itemAddController = require('../controllers/itemAddController')
const router = express.Router();
 
router.get("/getAllItemAdds", itemAddController.getAllItemAdds)
router.post("/createItemAdd", itemAddController.createItemAdd)
router.put("/updateItemAdd/:id", itemAddController.updateItemAdd)
router.delete("/deleteItemAdd/:id", itemAddController.deleteItemAdd)

module.exports = router;