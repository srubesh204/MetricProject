const partModel = require("../models/partModel")
const excelToJson = require('convert-excel-to-json');

const partController = {
  getAllParts: async (req, res) => {
    try {
      const partResult = await partModel.find();
      res.status(202).json({ result: partResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Part Data');
    }
  },

  getPartsByPlant: async (req, res) => {
    const { allowedPlants }= req.body
    try {
      const partByPlant = await partModel.aggregate([
        {
          $match: {
            "partPlant": { $in: allowedPlants ? allowedPlants : [] } // Specify the values to match
          }
        }
      ])
      res.status(202).json({ result: partByPlant, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err); 
      res.status(500).send('Error on Part Get Data By Plant');
    }
  },


  createPart: async (req, res) => {

    try {
      const { partNo, operationNo, partStatus, partName, customer, partPlant } = req.body;
      const partResult = new partModel({ partNo, partName, customer, operationNo, partStatus, partPlant });
      const validationError = partResult.validateSync();

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

      await partResult.save();
      return res.status(200).json({ message: "Part  Successfully Saved", status: 1 });
    } catch (error) {
      console.log(error)
      if (error.errors) {
        const errors500 = {};
        for (const key in error.errors) {
          errors500[key] = error.errors[key].message;
        }
        return res.status(500).json({ error: errors500, status: 0 });
      }

      return res.status(500).json({ error: 'Internal server error on Part', status: 0 });
    }
  },
  updatePart: async (req, res) => {
    try {
      const partId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      //   return res.status(400).json({ error: 'Invalid desId value' });
      // }

      // Create an object with the fields you want to update
      const { partNo, partName, customer, operationNo, partStatus, partPlant } = req.body;

      const updatePartFields = {
        partNo,
        partName,
        customer,
        operationNo,
        partStatus,
        partPlant
      };
      const partUpdate = new partModel(updatePartFields);

      const validationError = partUpdate.validateSync();
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
      const updatePart = await partModel.findOneAndUpdate(
        { _id: partId },
        updatePartFields,
        { new: true } // To return the updated document
      );

      if (!updatePart) {
        return res.status(404).json({ error: 'Part not found' });
      }
      console.log("Part Updated Successfully")
      res.status(200).json({ result: updatePart, message: "Part Updated Successfully" });
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
  deletePart: async (req, res) => {
    try {

      const { partIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = [];

      for (const partId of partIds) {
        // Find and remove each vendor by _id
        const deletedPart = await partModel.findOneAndRemove({ _id: partId });
        console.log(deletedPart)
        if (!deletedPart) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`Part with ID ${partId} not found.`);
          res.status(500).json({ message: `Part with ID not found.` });

        } else {
          console.log(`Part with ID ${partId} deleted successfully.`);
          deleteResults.push(deletedPart);
        }
      }

      return res.status(202).json({ message: 'Part deleted successfully', results: `${deleteResults.length} Part Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getPartById: async (req, res) => {
    try {
      const partId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getPartById = await partModel.findOne(
        { _id: partId }// To return the updated document
      );

      if (!getPartById) {
        return res.status(404).json({ error: 'Part not found' });
      }
      console.log("Part Get Successfully")
      res.status(200).json({ result: getPartById, message: "Part get Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
    }
  },
  uploadPartInExcel: async (req, res) => {
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
          A: 'partNo',
          B: 'partName',
          C: 'customer',
          D: 'operationNo',
          E: 'partStatus',
          F: 'partPlant'
        }
      });
      console.log(jsonData)

      const uploadPromises = jsonData.Sheet1.map(async (item) => {
        try {
          // Create an instance of departmentModel and save it to the database
          const newPart = new partModel(item); // Assuming 'item' conforms to your DepartmentModel schema
          const savedPart = await newPart.save();
          return savedPart;

        } catch (error) {
          console.error('Error saving department:', error);
        }
      });

      // Execute all upload promises
      const uploadedPart = await Promise.all(uploadPromises);

      res.status(200).json({ uploadedPart, message: 'Uploaded successfully' });
    } catch (error) {
      console.error('Error uploading Excel data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}


module.exports = partController;