const express = require("express");
const mailController = require('../controllers/mailController')
const router = express.Router();
 
router.post("/sendMail", mailController.mailSender)
router.post("/MailWithAttachment", mailController.MailWithAttachment)


module.exports = router;