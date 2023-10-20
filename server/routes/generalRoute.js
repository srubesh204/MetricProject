const express = require("express");
const generalController = require('../controllers/generalController')
const router = express.Router();
 
router.get("/getAllStateAndCity", generalController.getAllStateAndCity)
//router.post("/createDesignation", designationController.createDesignation)
module.exports = router;