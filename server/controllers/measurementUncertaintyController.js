const measurementUncertaintyModel = require("../models/measurementUncertaintyModel")
const excelToJson = require('convert-excel-to-json');
const measurementUncertaintyController = {
  getAllMeasurementUncertainty: async (req, res) => {
    try {
      const measurementUncertaintyResult = await measurementUncertaintyModel.find();
      res.status(202).json({ result: measurementUncertaintyResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Item Master');
    }
  },
  createMeasurementUncertainty: async (req, res) => {
    try {
      const { uncItemName, uncRangeSize, uncLC, uncMaterial, uncDate, uncMasterDetails, uncStartTemp, uncEndTemp, uncMeanTemp, uncRefTemp, uncTEMaster, uncTEDUC, uncR1, uncR2, uncR3, uncR4, uncR5, uncStdDeviation, uncN } = req.body;
      const measurementUncertaintyResult = new measurementUncertaintyModel({ uncItemName, uncRangeSize, uncLC, uncMaterial, uncDate, uncMasterDetails, uncStartTemp, uncEndTemp, uncMeanTemp, uncRefTemp, uncTEMaster, uncTEDUC, uncR1, uncR2, uncR3, uncR4, uncR5, uncStdDeviation, uncN });
      const validationError = measurementUncertaintyResult.validateSync();
      if (validationError) {
        // Handle validation errors
        const validationErrors = {};
        if (validationError.errors) {
          // Convert Mongoose validation error details to a more user-friendly format
          for (const key in validationError.errors) {
            validationErrors[key] = validationError.errors[key].message;
          }
        }
        return res.status(400).json({
          errors: validationErrors
        });
      }
      console.log("success")
      await measurementUncertaintyResult.save();
      return res.status(200).json({ message: "Measurement Uncertainty Data Successfully Saved", status: 1 });
    } catch (error) {
      console.log(error)
      if (error.errors) {
        const errors500 = {};
        for (const key in error.errors) {
          errors500[key] = error.errors[key].message;
        }
        return res.status(500).json({ error: errors500, status: 0 });
      }
      return res.status(500).json({ error: 'Internal server error on Item Master', status: 0 });
    }
  },
  updateMeasurementUncertainty: async (req, res) => {
    try {
      const itemUNCId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      //   return res.status(400).json({ error: 'Invalid desId value' });
      // }

      // Create an object with the fields you want to update
      const { uncItemName, uncRangeSize, uncLC, uncMaterial, uncDate, uncMasterDetails, uncStartTemp, uncEndTemp, uncMeanTemp, uncRefTemp, uncTEMaster, uncTEDUC, uncR1, uncR2, uncR3, uncR4, uncR5, uncStdDeviation, uncN } = req.body;
      const updateImFields = {
        uncItemName,
        uncRangeSize,
        uncLC,
        uncMaterial,
        uncDate,
        uncMasterDetails,
        uncStartTemp,
        uncEndTemp,
        uncMeanTemp,
        uncRefTemp,
        uncTEMaster,
        uncTEDUC,
        uncR1,
        uncR2,
        uncR3,
        uncR4,
        uncR5,
        uncStdDeviation,
        uncN
        // Add more fields as needed
      };
      // Find the designation by desId and update it
      const itemUncertaintyUpdate = new measurementUncertaintyModel(updateImFields);
      const validationError = itemUncertaintyUpdate.validateSync();
      if (validationError) {
        // Handle validation errors
        const validationErrors = {};
        if (validationError.errors) {
          // Convert Mongoose validation error details to a more user-friendly format
          for (const key in validationError.errors) {
            validationErrors[key] = validationError.errors[key].message;
          }
        }
        return res.status(400).json({
          errors: validationErrors
        });
      }
      // Find the designation by desId and update it
      const updateUncertainty = await measurementUncertaintyModel.findOneAndUpdate(
        { _id: itemUNCId },
        updateImFields,
        { new: true } // To return the updated document
      );
      if (!updateUncertainty) {
        return res.status(404).json({ error: 'Measurement Uncertainty not found' });
      }
      console.log("Measurement Uncertainty Updated Successfully")
      res.status(200).json({ result: updateUncertainty, message: "Measurement Uncertainty Updated Successfully" });
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        return res.status(500).json({ error: 'Duplicate Value Not Accepted' });
      }
      const errors500 = {};
      for (const key in error.errors) {
        errors500[key] = error.errors[key].message;
      }
      res.status(500).json({ error: error, status: 0 });
    }
  },
  getUncertaintyById: async (req, res) => {
    try {
      const itemUNCId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getUncertaintyById = await measurementUncertaintyModel.findOne(
        { _id: itemUNCId }// To return the updated document
      );
      if (!getUncertaintyById) {
        return res.status(404).json({ error: 'MeasurementUncertainty not found' });
      }
      console.log("Measurement Uncertainty Get Successfully")
      res.status(200).json({ result: getUncertaintyById, message: "Measurement Uncertainty get Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
    }
  },
}
module.exports = measurementUncertaintyController;