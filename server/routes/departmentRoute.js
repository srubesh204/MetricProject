const express = require("express");
const departmentController = require('../controllers/departmentController')
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');
 
router.get("/getAllDepartments", departmentController.getAllDepartment)
router.get("/getDepartmentById/:id", departmentController.getDepartmentById)
router.post("/createDepartment", departmentController.createDepartment)
router.put("/updateDepartment/:id", departmentController.updateDepartment)
router.delete("/deleteDepartment", departmentController.deleteDepartment)
router.post("/uploadDepartmentInExcel", upload, departmentController.uploadDepartmentInExcel)

module.exports = router;