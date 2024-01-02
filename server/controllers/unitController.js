const unitModel = require("../models/unitModel")
const excelToJson = require('convert-excel-to-json');

const unitController = {
  getAllUnits: async (req, res) => {
    try {
      const unitResult = await unitModel.find();
      res.status(202).json({ result: unitResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Unit Data');
    }
  },
  createUnit: async (req, res) => {

    try {
      const { unitName } = req.body;

      const unitResult = new unitModel({ unitName });
      const validationError = unitResult.validateSync();

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

      await unitResult.save();
      return res.status(200).json({ message: "Unit Successfully Saved", status: 1 });
    } catch (error) {
      console.log(error)
      if (error.errors) {
        const errors500 = {};
        for (const key in error.errors) {
          errors500[key] = error.errors[key].message;
        }
        return res.status(500).json({ error: errors500, status: 0 });
      }

      return res.status(500).json({ error: 'Internal server error on Unit', status: 0 });
    }
  },
  updateUnit: async (req, res) => {
    try {
      const unitId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      //   return res.status(400).json({ error: 'Invalid desId value' });
      // }

      // Create an object with the fields you want to update
      const { unitName } = req.body;

      const updatedUnitData = {
        unitName
        // Add more fields as needed
      };
      const unitUpdate = new unitModel(updatedUnitData);

      const validationError = unitUpdate.validateSync();
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
      const updateUnit = await unitModel.findOneAndUpdate(
        { _id: unitId },
        updatedUnitData,
        { new: true } // To return the updated document
      );

      if (!updateUnit) {
        return res.status(404).json({ error: 'Unit not found' });
      }
      console.log("Unit Updated Successfully")
      res.status(200).json({ result: updateUnit, message: "Unit Updated Successfully" });
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
  deleteUnit: async (req, res) => {
    try {

      const {unitIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = []; 

      for (const unitId of unitIds) {
        // Find and remove each vendor by _id
        const deletedUnit = await unitModel.findOneAndRemove({ _id: unitId });
        console.log(deletedUnit)
        if (!deletedUnit) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`Unit with ID ${unitId} not found.`);
          res.status(500).json({ message:  `Unit with ID not found.`});
          
        } else {
          console.log(`Unit with ID ${unitId} deleted successfully.`);
          deleteResults.push(deletedUnit); 
        }
      }

      return res.status(202).json({ message: 'Unit deleted successfully', results: `${deleteResults.length} Unit Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getUnitById : async (req, res) => {
    try {
      const unitId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getUnitById = await unitModel.findOne(
          { _id: unitId }// To return the updated document
      );

      if (!getUnitById) {
          return res.status(404).json({ error: 'Unit not found' });
      }
      console.log("Unit Get Successfully")
      res.status(200).json({ result: getUnitById, message: "Unit get Successfully" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
  }
},
uploadUnitInExcel: async (req, res) => {
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
        A: 'unitName',
      }
    });
    console.log(jsonData)

    const uploadPromises = jsonData.Sheet1.map(async (item) => {
      try {
        // Create an instance of departmentModel and save it to the database
        const newUnit = new unitModel(item); // Assuming 'item' conforms to your DepartmentModel schema
        const savedUnit = await newUnit.save();
        return savedUnit;

      } catch (error) {
        console.error('Error saving department:', error);
      }
    });

    // Execute all upload promises
    const uploadedUnit = await Promise.all(uploadPromises);

    res.status(200).json({ uploadedUnit, message: 'Uploaded successfully' });
  } catch (error) {
    console.error('Error uploading Excel data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


}


module.exports = unitController;