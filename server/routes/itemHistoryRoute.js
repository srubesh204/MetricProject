const express = require("express");
const itemHistoryController = require('../controllers/itemHistoryController')
const router = express.Router();
const multer = require('multer');


 
router.get("/getAllItemHistory", itemHistoryController.getAllItemHistory)

module.exports = router

