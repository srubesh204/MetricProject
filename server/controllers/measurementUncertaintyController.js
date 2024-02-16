const { default: puppeteer } = require("puppeteer");
const { compDetailsSchema } = require("../models/compDetailsModel");
const measurementUncertaintyModel = require("../models/measurementUncertaintyModel")
const excelToJson = require('convert-excel-to-json');
const path = require("path");
const fs = require('fs');
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
      const {
        uncItemName,
        uncRangeSize,
        uncRangeSizeUnit,
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
        uncTI,
        uncR1,
        uncR2,
        uncR3,
        uncR4,
        uncR5,
        uncR6,
        uncR7,
        uncR8,
        uncR9,
        uncR10,
        uncStdDeviation,
        uncN,
        combinedUnc,
        uncCoverageFactor,
        uncDegOfFreedom,
        uncUncertainity,
        uncTypeBResult
      } = req.body
      const measurementUncertaintyResult = new measurementUncertaintyModel({
        uncItemName,
        uncRangeSize,
        uncRangeSizeUnit,
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
        uncTI,
        uncR1,
        uncR2,
        uncR3,
        uncR4,
        uncR5,
        uncR6,
        uncR7,
        uncR8,
        uncR9,
        uncR10,
        uncStdDeviation,
        uncN,
        combinedUnc,
        uncCoverageFactor,
        uncDegOfFreedom,
        uncUncertainity,
        uncTypeBResult
      });

      const getCompDetailsById = await compDetailsSchema.findOne(
        { compId: 1 } // To return the updated document
      );

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
      //const uncResult = await measurementUncertaintyResult.save();


      //if (Object.keys(uncResult).length !== 0) {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Read the HTML template file
      const filePath = path.resolve(__dirname, '../../server/templates/uncertaintyTemplate.html');
      const htmlTemplate = fs.readFileSync(filePath, 'utf8');

      // Replace placeholders with actual data
      const modifiedHTML = htmlTemplate

        .replace(/{{companyName}}/g, getCompDetailsById ? getCompDetailsById.getCompDetailsById : "")
        .replace(/{{uncDate}}/g, uncDate ? uncDate : "")
        .replace(/{{uncItemName}}/g, uncItemName ? uncItemName : "")



      // Add more replace statements for additional placeholders as needed

      // Set the modified HTML content

      console.log(modifiedHTML)
      const cssPath = path.resolve(__dirname, '../templates/bootstrap.min.css');

      await page.setContent(modifiedHTML, { waitUntil: 'domcontentloaded' });
      await page.addStyleTag({ path: cssPath });
      // Generate PDF
      await page.pdf({ path: `./storage/uncertaintyCertificates/${grnNo}.pdf`, format: 'A4' });

      await browser.close();
      console.log(process.env.SERVER_PORT)
      console.log('Uncertainty PDF created successfully');
      // }
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
      const { uncItemName,
        uncRangeSize,
        uncRangeSizeUnit,
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
        uncTI,
        uncR1,
        uncR2,
        uncR3,
        uncR4,
        uncR5,
        uncR6,
        uncR7,
        uncR8,
        uncR9,
        uncR10,
        uncStdDeviation,
        uncN,
        combinedUnc,
        uncCoverageFactor,
        uncDegOfFreedom,
        uncUncertainity,
        uncTypeBResult } = req.body;

      const updateImFields = {
        uncItemName,
        uncRangeSize,
        uncRangeSizeUnit,
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
        uncTI,
        uncR1,
        uncR2,
        uncR3,
        uncR4,
        uncR5,
        uncR6,
        uncR7,
        uncR8,
        uncR9,
        uncR10,
        uncStdDeviation,
        uncN,
        combinedUnc,
        uncCoverageFactor,
        uncDegOfFreedom,
        uncUncertainity,
        uncTypeBResult
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

  deleteMeasurementUncertainty: async (req, res) => {
    try {

      const { uncertaintyIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = [];

      for (const uncertaintyId of uncertaintyIds) {
        // Find and remove each vendor by _id
        const deletedUncertainty = await measurementUncertaintyModel.findOneAndRemove({ _id: uncertaintyId });
        console.log(deletedUncertainty)
        if (!deletedUncertainty) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`Uncertainty with ID ${uncertaintyId} not found.`);
          res.status(500).json({ message: `Vendor with ID not found.` });

        } else {
          console.log(`Uncertainty with ID ${uncertaintyId} deleted successfully.`);
          deleteResults.push(deletedUncertainty);
        }
      }

      return res.status(202).json({ message: 'Measurement Uncertainty deleted successfully', results: `${deleteResults.length} Measurement Uncertainty Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
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