const express = require("express");
const employeeController = require('../controllers/employeeController')
const router = express.Router();
 
router.get("/getAllEmployee", employeeController.getAllEmployee)
router.post("/createEmployee", employeeController.createEmployee)
module.exports = router;