const departmentModel = require("../models/departmentModel")
const excelToJson = require('convert-excel-to-json');

const departmentController = {
  getAllDepartment: async (req, res) => {
    try {
      const departmentResult = await departmentModel.find();
      res.status(202).json({ result: departmentResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Department');
    }
  },
  createDepartment: async (req, res) => {

    try {
      const { department, departmentStatus, defaultdep,departmentPlant } = req.body;
      const departmentResult = new departmentModel({ department, departmentStatus, defaultdep,departmentPlant });
      const validationError = departmentResult.validateSync();

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

      await departmentResult.save();
      return res.status(200).json({ message: "Department Data Successfully Saved", status: 1 });
    } catch (error) {
      console.log(error)
      if (error.errors) {
        const errors500 = {};
        for (const key in error.errors) {
          errors500[key] = error.errors[key].message;
        }
        return res.status(500).json({ error: errors500, status: 0 });
      }

      return res.status(500).json({ error: 'Internal server error on Department', status: 0 });
    }
  },

  updateDepartment: async (req, res) => {
    try {
      const depId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      //   return res.status(400).json({ error: 'Invalid desId value' });
      // }

      // Create an object with the fields you want to update
      const updateDepFields = {
        /* Specify the fields and their updated values here */
        department: req.body.department, departmentStatus: req.body.departmentStatus, defaultdep: req.body.defaultdep, departmentPlant: req.body.departmentPlant, // Example: updating the 'name' field
        // Add more fields as needed
      };

      // Find the designation by desId and update it
      const departmentUpdate = new departmentModel(updateDepFields);

      const validationError = departmentUpdate.validateSync();
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
      const updateDepartment = await departmentModel.findOneAndUpdate(
        { _id: depId },
        updateDepFields,
        { new: true } // To return the updated document
      );

      if (!updateDepartment) {
        return res.status(404).json({ error: 'Department not found' });
      }
      console.log("Department Updated Successfully")
      res.status(200).json({ result: updateDepartment, message: "Department Updated Successfully" });
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
  deleteDepartment: async (req, res) => {
    try {

      const { departmentIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = [];

      for (const departmentId of departmentIds) {
        // Find and remove each vendor by _id
        const deletedDepartment = await departmentModel.findOneAndRemove({ _id: departmentId });
        console.log(deletedDepartment)
        if (!deletedDepartment) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`Department with ID ${departmentId} not found.`);
          res.status(500).json({ message: `Department with ID not found.` });

        } else {
          console.log(`Department with ID ${departmentId} deleted successfully.`);
          deleteResults.push(deletedDepartment);
        }
      }

      return res.status(202).json({ message: 'Department deleted successfully', results: `${deleteResults.length} Department Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getDepartmentById: async (req, res) => {
    try {
      const departmentId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getDepartmentById = await departmentModel.findOne(
        { _id: departmentId }// To return the updated document
      );

      if (!getDepartmentById) {
        return res.status(404).json({ error: 'Department not found' });
      }
      console.log("Department Get Successfully")
      res.status(200).json({ result: getDepartmentById, message: "Department get Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
    }
  },
  uploadDepartmentInExcel: async (req, res) => {
    try {
      if (!req.file) {
        console.log("hi")
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      const excelData = req.file.buffer; // Access the file buffer
  
      // Convert Excel data to JSON
      const jsonData = excelToJson({
        source: excelData,
        columnToKey: {
          A: 'department',
          B: 'departmentStatus',
          C: 'defaultdep',
          D: 'departmentPlant'
      }
      });
      console.log(jsonData)
  
      const uploadPromises = jsonData.Sheet1.map(async (item) => {
        try {
          // Create an instance of departmentModel and save it to the database
          const newDepartment = new departmentModel(item); // Assuming 'item' conforms to your DepartmentModel schema
          const savedDepartment = await newDepartment.save();
          return savedDepartment;

        } catch (error) {
          console.error('Error saving department:', error);   
        }
      });
  
      // Execute all upload promises
      const uploadedDepartments = await Promise.all(uploadPromises);
  
      res.status(200).json({ uploadedDepartments, message: 'Uploaded successfully' });
    } catch (error) {
      console.error('Error uploading Excel data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getDepartmentByPlant: async (req, res) => {
    try {
      const { allowedPlants } = req.body
      console.log(allowedPlants)

      const departmentByPlant = await departmentModel.aggregate([
        {
          $match: {
            "departmentPlant": { $in: allowedPlants ? allowedPlants : [] }
          }
        },
      ])
      res.status(202).json({ result: departmentByPlant, status: 1, message: "Department Get Successfully" })
    } catch (err) {
      console.log(err)
    }
  }

}


module.exports = departmentController;