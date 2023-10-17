const express = require('express');
const designationController = require('../controllers/designationController')
const router = express.Router();



router.get("/getDesignation", designationController.getAllDesignation)
router.post("/createDesignation", designationController.createDesignation)



module.exports = router;