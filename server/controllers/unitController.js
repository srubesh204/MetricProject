const unitModel = require("../models/unitModel")

const unitController = {
    getAllUnits: async (req, res) => {
        try {
          const unitResult = await unitModel.find();
          return res.status(202).json({ result: unitResult, status: 1 });
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
         return res.status(500).send('Error on Unit');
        }
      },
      createUnit: async (req, res) => {
       
        try {
          const { unitName } = req.body;
          if (!unitName) {
            return res.status(400).json({ error: 'All fields must be provided' });
          }
          const unitResult = new unitModel({ unitName});
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
         return res.status(200).json({message: "Unit Data Successfully Saved",status: 1});
        } catch (error) {
          console.log(error)
          const errors500 = {};
      for (const key in error.errors) {
        errors500[key] = error.errors[key].message;
      }
      return res.status(500).json({ error: errors500, status: 0 });
    }
  },
      updateUnit: async (req, res) => {
        try {
          const unitId = req.params.id; // Assuming desId is part of the URL parameter
          // if (isNaN(desId)) {
          //   return res.status(400).json({ error: 'Invalid desId value' });
          // }
      
          // Create an object with the fields you want to update
          const updateUnitFields = {
            /* Specify the fields and their updated values here */
            unitName: req.body.unitName,  // Example: updating the 'name' field
            // Add more fields as needed
          };
          const updatedUnit = new unitModel(updateUnitFields);

      // Perform synchronous validation on the updatedEmployee
      const validationError = updatedUnit.validateSync();

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
            {_id : unitId},
            updateUnitFields,
            { new: true } // To return the updated document
          );
      
          if (!updateUnit) {
            return res.status(404).json({ error: 'Unit not found' });
          }
      
          res.status(200).json({ message: "Unit Updated Successfully", result: updatePart, status: 1 });
    } catch (error) {
      console.log(error.code);
      if (error.code === 11000) {
        return res.status(500).json({ error: 'Duplicate Value Not Accepted' });
      }
      const errors500 = {};
      for (const key in error.errors) {
        errors500[key] = error.errors[key].message;
      }
      return res.status(500).json({ error: error, status: 0 });
    }
  },
      deleteUnit : async (req, res) => {
        try {
          const unitId = req.params.id; // Assuming id is part of the URL parameter
    
          // Find the designation by _id and remove it
          const deleteUnit = await unitModel.findOneAndRemove(
            { _id: unitId } // Pass the _id as an object
          );
    
          if (!deleteUnit) {
            return res.status(404).json({ error: 'Unit detail not found' });
          }
    
          res.status(202).json({ message: 'Unit detail deleted successfully' ,result: deleteUnit });
        } catch (error) {
          console.error(error);
          return res.status(500).send('Internal Server Error');
        }
      }
      }


module.exports = unitController;