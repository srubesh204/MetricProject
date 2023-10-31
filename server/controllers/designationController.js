const designationModel = require("../models/designationModel")

const designationController = {
  getAllDesignations: async (req, res) => {
    try {
      const designationResult = await designationModel.find();
      res.status(202).json({ result: designationResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Designation');
    }
  },
  createDesignation: async (req, res) => {

    try {
      const { designation } = req.body;
      const designationResult = new designationModel({ designation});
            const validationError = designationResult.validateSync();

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

            await designationResult.save();
            return res.status(200).json({ message: "Designation Data Successfully Saved", status: 1 });
        } catch (error) {
            console.log(error)
            if (error.errors) {
                const errors500 = {};
                for (const key in error.errors) {
                    errors500[key] = error.errors[key].message;
                }
                return res.status(500).json({ error: errors500, status: 0 });
            }

            return res.status(500).json({ error: 'Internal server error on Designation', status: 0 });
        }
    },
    updateDesignation: async (req, res) => {
      try {
          const desId = req.params.id; // Assuming desId is part of the URL parameter
          // if (isNaN(desId)) {
          //   return res.status(400).json({ error: 'Invalid desId value' });
          // }

          // Create an object with the fields you want to update
          const { designation } = req.body;

          const updateDesFields = {
              designation
             
              // Add more fields as needed
          };
          const designationUpdate = new designationModel(updateDesFields);

          const validationError = designationUpdate.validateSync();
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
          const updateDesignation = await designationModel.findOneAndUpdate(
              { _id: desId },
              updateDesFields,
              { new: true } // To return the updated document
          );

          if (!updateDesignation) {
              return res.status(404).json({ error: 'Designation not found' });
          }
          console.log("Designation Updated Successfully")
          res.status(200).json({ result: updateDesignation, message: "Designation Updated Successfully" });
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
  deleteDesignation: async (req, res) => {
  
      try {
          const desId = req.params.id; // Assuming id is part of the URL parameter

          // Find the designation by _id and remove it
          const deleteDesignation = await designationModel.findOneAndRemove(
              { _id: desId } // Pass the _id as an object
          );

          if (!deleteDesignation) {
              return res.status(404).json({ error: 'Designation not found' });
          }

          res.status(202).json({ message: 'Designation detail deleted successfully' ,result: deleteDesignation });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  }
}

module.exports = designationController;