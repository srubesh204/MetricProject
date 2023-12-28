const express = require("express");
const backupController = require('../controllers/backupController')
const router = express.Router();
 
router.get("/getAllBackUp", backupController.getAllBackUp)
router.get("/getBackUpById /:id", backupController.getBackUpById )
router.post("/createBackUp", backupController.createBackUp)
router.put("/updateBackUp/:id", backupController.updateBackUp)
router.delete("/deleteBackUp", backupController.deleteBackUp)

 
module.exports = router;
