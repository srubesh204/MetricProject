const express = require("express");
const uncMaterialCteController = require('../controllers/uncMaterialCteController')
const router = express.Router();


router.get("/getAllUncMaterialCte",uncMaterialCteController.getAllUncMaterialCte)
router.get("/getMaterialCteAndTypeB", uncMaterialCteController.getMaterialCteAndTypeB)
module.exports = router;