const express = require("express");
const backupController = require('../controllers/backupController')
const router = express.Router();
 
router.post("/backUpDb", backupController.backUpDb)
router.get("/getBackUpById/:id", backupController.getBackUpById )
router.post("/restoreDB", backupController.restoreDB)
router.put("/updateBackUp/:id", backupController.updateBackUp)

 
module.exports = router;
