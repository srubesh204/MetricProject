const express = require('express');
const designationController = require('../controllers/designationController')
const router = express.Router();



router.get("/getDesignation", designationController.getAllDesignation)



module.exports = router;