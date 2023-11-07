const placeOfUsageModel = require("../models/placeOfUsageModel")

const placeOfUsageController = {
    getAllPlaceOfUsages: async (req, res) => {
        try {
          const placeOfUsageResult = await placeOfUsageModel.find();
          res.status(202).json({ result: placeOfUsageResult, status: 1 });
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Place of Usage');
        }
      },
      createPlaceOfUsage: async (req, res) => {
       
        try {
          const { placeOfUsage} = req.body;
          const placeOfUsageResult = new placeOfUsageModel({ placeOfUsage});
          const validationError = placeOfUsageResult.validateSync();

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
    
                await placeOfUsageResult.save();
                return res.status(200).json({ message: "Place Of Usage Successfully Saved", status: 1 });
            } catch (error) {
                console.log(error)
                if (error.errors) {
                    const errors500 = {};
                    for (const key in error.errors) {
                        errors500[key] = error.errors[key].message;
                    }
                    return res.status(500).json({ error: errors500, status: 0 });
                }
    
                return res.status(500).json({ error: 'Internal server error on Place Of Usage', status: 0 });
            }
        },
         
      updatePlaceOfUsage: async (req, res) => {
        try {
          const pouId = req.params.id; // Assuming desId is part of the URL parameter
          // if (isNaN(desId)) {
          //   return res.status(400).json({ error: 'Invalid desId value' });
          // }
      
          // Create an object with the fields you want to update
          const updatepouFields = {
            /* Specify the fields and their updated values here */
            placeOfUsage: req.body.placeOfUsage // Example: updating the 'name' field
            // Add more fields as needed
          };
      
          // Find the designation by desId and update it
          const placeOfUsageUpdate = new placeOfUsageModel(updatepouFields);

          const validationError = placeOfUsageUpdate.validateSync();
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
          const updatePlaceOfUsage = await placeOfUsageModel.findOneAndUpdate(
              { _id: depId },
              updatepouFields,
              { new: true } // To return the updated document
          );

          if (!updatePlaceOfUsage) {
              return res.status(404).json({ error: 'Place Of Usage not found' });
          }
          console.log("Place Of Usage Updated Successfully")
          res.status(200).json({ result: updatePlaceOfUsage, message: "Place Of Usage Updated Successfully" });
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
  deletePlaceOfUsage: async (req, res) => {
    try {
        const pouId = req.params.id; // Assuming id is part of the URL parameter

        // Find the designation by _id and remove it
        const deletePlaceOfUsage = await placeOfUsageModel.findOneAndRemove(
            { _id: pouId } // Pass the _id as an object
        );

        if (!deletePlaceOfUsage) {
            return res.status(404).json({ error: 'Place Of Usage not found' });
        }

        res.status(202).json({ message: 'Place Of Usage detail deleted successfully' ,result: deletePlaceOfUsage });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
}
}


module.exports = placeOfUsageController;