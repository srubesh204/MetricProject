const express = require("express");
const versionController = require('../controllers/versionController')
const router = express.Router();
 
router.get("/getAllVersion", versionController.getAllVersion)
router.get("/getVersionById/:id", versionController.getVersionById )
router.post("/createVersion", versionController.createVersion)
router.put("/updateVersion/:id", versionController.updateVersion)
router.delete("/deleteVersion", versionController.deleteVersion)

 
module.exports = router;