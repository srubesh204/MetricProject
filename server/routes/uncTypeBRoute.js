const express = require("express");
const uncTypeBController = require('../controllers/uncTypeBController')
const router = express.Router();


router.get("/getAllUncTypeB",uncTypeBController.getAllUncTypeB)
router.get("/getAllClccf",uncTypeBController.getAllClccf)

module.exports = router;