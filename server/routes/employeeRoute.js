const express = require("express");
const employeeController = require('../controllers/employeeController')
const router = express.Router();
 
router.get("/getAllEmployees", employeeController.getAllEmployee)
router.get("/getEmployeeById/:id", employeeController.getEmployeeById)
router.post("/createEmployee", employeeController.createEmployee)
router.put("/updateEmployee/:id", employeeController.updateEmployee)
router.delete("/deleteEmployee", employeeController.deleteEmployee)

module.exports = router;