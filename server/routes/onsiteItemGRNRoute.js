const express = require("express");
const onsiteItemGRNController = require('../controllers/onsiteItemGRNController')
const router = express.Router();
 
router.get("/getAllOnsiteItemGRN", onsiteItemGRNController.getAllOnsiteItemGRN)
router.get("/getOnsiteItemGRNById /:id", onsiteItemGRNController.getOnsiteItemGRNById )
router.post("/createOnsiteItemGRN", onsiteItemGRNController.createOnsiteItemGRN)
router.put("/updateOnsiteItemGRN/:id", onsiteItemGRNController.updateOnsiteItemGRN)
router.delete("/deleteOnsiteItemGRN", onsiteItemGRNController.deleteOnsiteItemGRN)
module.exports = router;