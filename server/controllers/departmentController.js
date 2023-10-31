const departmentModel = require("../models/departmentModel")

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
          const { department, area, placeOfUsage } = req.body;
          const departmentResult = new departmentModel({ department, area, placeOfUsage });
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
            department: req.body.department, area : req.body.area, placeOfUsage : req.body.placeOfUsage, // Example: updating the 'name' field
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
        const depId = req.params.id; // Assuming id is part of the URL parameter

        // Find the designation by _id and remove it
        const deleteDepartment = await departmentModel.findOneAndRemove(
            { _id: depId } // Pass the _id as an object
        );

        if (!deleteDepartment) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.status(202).json({ message: 'Department detail deleted successfully' ,result: deleteDepartment });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
}
}


module.exports = departmentController;