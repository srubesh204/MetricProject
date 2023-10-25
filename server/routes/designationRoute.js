const express = require("express");
const designationController = require('../controllers/designationController')
const router = express.Router();
 
router.get("/getAllDesignations", designationController.getAllDesignation)
router.post("/createDesignation", designationController.createDesignation)
router.put("/updateDesignation/:id", designationController.updateDesignation)
router.delete("/deleteDesignation/:id", designationController.deleteDesignation)
router.get("/getDesignationByData/:id", designationController.getDesignationByData)
module.exports = router;