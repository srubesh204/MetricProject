const express = require("express");
const employeeController = require('../controllers/employeeController')
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');
 
router.get("/getAllEmployees", employeeController.getAllEmployee)
router.get("/getAllActiveEmployees", employeeController.getAllActiveEmployees)
router.get("/getEmployeeById/:id", employeeController.getEmployeeById)
router.post("/createEmployee", employeeController.createEmployee)
router.put("/updateEmployee/:id", employeeController.updateEmployee)
router.delete("/deleteEmployee", employeeController.deleteEmployee)
router.post("/uploadEmployeeInExcel", upload, employeeController.uploadEmployeeInExcel)
router.post("/getMailIdsByPlant", employeeController.getMailIdsByPlant) 
router.put("/updateEmployeePlantDetails", employeeController.updateEmployeePlantDetails)

module.exports = router;