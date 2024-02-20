const express = require("express");
const itemHistoryController = require('../controllers/itemHistoryController')
const router = express.Router();
const multer = require('multer');


 
router.get("/getAllItemHistory", itemHistoryController.getAllItemHistory)
router.get("/getHistoryByIMTENo/:imte", itemHistoryController.getHistoryByIMTENo)

module.exports = router

