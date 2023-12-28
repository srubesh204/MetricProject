const express = require("express");
const mailConfigController = require('../controllers/mailConfigController')
const router = express.Router();
 
router.get("/getAllMailConfig", mailConfigController.getAllMailConfig)
router.get("/getMailConfigById /:id", mailConfigController.getMailConfigById )
router.post("/createMailConfig", mailConfigController.createMailConfig)
router.put("/updateMailConfig/:id", mailConfigController.updateMailConfig)
router.delete("/deleteMailConfig", mailConfigController.deleteMailConfig)

 
module.exports = router;