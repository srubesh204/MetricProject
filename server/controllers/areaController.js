const areaModel = require("../models/areaModel")
const excelToJson = require('convert-excel-to-json');

const areaController = {
  getAllAreas: async (req, res) => {
    try {
      const areaResult = await areaModel.find();
      res.status(202).json({ result: areaResult, status: 1, message: "Area Get Successfull" });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Area');
    }
  },
  createArea: async (req, res) => {

    try {

      const { area, areaStatus } = req.body;
 
      let dd = req.body.area.toLowerCase().
        split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      console.log(area)
      const areaResult = new areaModel({ area, areaStatus });
      const validationError = areaResult.validateSync();

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

      await areaResult.save();
      return res.status(200).json({ message: "Area Successfully Saved", status: 1 });
    } catch (error) {
      console.log(error)
      if (error.errors) {
        const errors500 = {};
        for (const key in error.errors) {
          errors500[key] = error.errors[key].message;
        }
        return res.status(500).json({ error: errors500, status: 0 });
      }

      return res.status(500).json({ error: 'Internal server error on Area', status: 0 });
    }
  },

  updateArea: async (req, res) => {
    try {
      const areaId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      //   return res.status(400).json({ error: 'Invalid desId value' });
      // }

      // Create an object with the fields you want to update
      const updateAreaFields = {
        /* Specify the fields and their updated values here */
        area: req.body.area, areaStatus: req.body.areaStatus// Example: updating the 'name' field
        // Add more fields as needed
      };

      // Find the designation by desId and update it
      const areaUpdate = new areaModel(updateAreaFields);

      const validationError = areaUpdate.validateSync();
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
      const updateArea = await areaModel.findOneAndUpdate(
        { _id: areaId },
        updateAreaFields,
        { new: true } // To return the updated document
      );

      if (!updateArea) {
        return res.status(404).json({ error: 'Area not found' });
      }
      console.log("Area Updated Successfully")
      res.status(200).json({ result: updateArea, message: "Area Updated Successfully" });
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
  deleteArea: async (req, res) => {
    try {

      const { areaIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = [];

      for (const areaId of areaIds) {
        // Find and remove each vendor by _id
        const deletedArea = await areaModel.findOneAndRemove({ _id: areaId });
        console.log(deletedArea)
        if (!deletedArea) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`Area with ID ${areaId} not found.`);
          res.status(500).json({ message: `Area with ID not found.` });

        } else {
          console.log(`Area with ID ${areaId} deleted successfully.`);
          deleteResults.push(deletedArea);
        }
      }

      return res.status(202).json({ message: 'Area deleted successfully', results: `${deleteResults.length} Area Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getAreaById: async (req, res) => {
    try {
      const areaId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getAreaById = await areaModel.findOne(
        { _id: areaId }// To return the updated document
      );

      if (!getAreaById) {
        return res.status(404).json({ error: 'Area not found' });
      }
      console.log("Area Get Successfully")
      res.status(200).json({ result: getAreaById, message: "Area get Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
    }
  },
  uploadAreaInExcel: async (req, res) => {
    try {
      if (!req.file) {
        console.log("hi")
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const excelData = req.file.buffer; // Access the file buffer

      // Convert Excel data to JSON
      const jsonData = excelToJson({
        source: excelData,
        header: {
          // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
          rows: 1 // 2, 3, 4, etc.
        },
        columnToKey: {
          A: 'area',
          B: 'areaStatus',
        }
      });
      console.log(jsonData)

      const uploadPromises = jsonData.Sheet1.map(async (item) => {
        try {
          // Create an instance of departmentModel and save it to the database
          const newArea = new areaModel(item); // Assuming 'item' conforms to your DepartmentModel schema
          const savedArea = await newArea.save();
          return savedArea;

        } catch (error) {
          console.error('Error saving department:', error);
        }
      });

      // Execute all upload promises
      const uploadedArea = await Promise.all(uploadPromises);

      res.status(200).json({ uploadedArea, message: 'Uploaded successfully' });
    } catch (error) {
      console.error('Error uploading Excel data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}


module.exports = areaController;