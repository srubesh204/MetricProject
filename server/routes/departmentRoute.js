const express = require("express");
const departmentController = require('../controllers/departmentController')
const router = express.Router();
 
router.get("/getAllDepartments", departmentController.getAllDepartment)
router.post("/createDepartment", departmentController.createDepartment)
router.put("/updateDepartment/:id", departmentController.updateDepartment)
router.delete("/deleteDepartment/:id", departmentController.deleteDepartment)

module.exports = router;