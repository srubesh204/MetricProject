const express = require("express");
const uncClController = require('../controllers/uncClController')
const router = express.Router();
router.get("/getAllUncCl",uncClController.getAllUncCl)

module.exports = router;