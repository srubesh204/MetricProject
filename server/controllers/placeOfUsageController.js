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
          const { placeOfUsage,placeOfUsageStatus} = req.body;
          const placeOfUsageResult = new placeOfUsageModel({ placeOfUsage,placeOfUsageStatus});
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
            placeOfUsage: req.body.placeOfUsage, placeOfUsageStatus:req.body.placeOfUsageStatus // Example: updating the 'name' field
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
              { _id: pouId },
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

      const {placeOfUsageIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = []; 

      for (const placeOfUsageId of placeOfUsageIds) {
        // Find and remove each vendor by _id
        const deletedPlaceOfUsage = await placeOfUsageModel.findOneAndRemove({ _id: placeOfUsageId });
        console.log(deletedPlaceOfUsage)
        if (!deletedPlaceOfUsage) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`PlaceOfUsage with ID ${placeOfUsageId} not found.`);
          res.status(500).json({ message:  `PlaceOfUsage with ID not found.`});
          
        } else {
          console.log(`PlaceOfUsage with ID ${placeOfUsageId} deleted successfully.`);
          deleteResults.push(deletedPlaceOfUsage); 
        }
      }

      return res.status(202).json({ message: 'PlaceOfUsage deleted successfully', results: `${deleteResults.length} PlaceOfUsage Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getPlaceOfUsageById : async (req, res) => {
    try {
      const placeOfUsageId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getPlaceOfUsageById = await placeOfUsageModel.findOne(
          { _id: placeOfUsageId }// To return the updated document
      );

      if (!getPlaceOfUsageById) {
          return res.status(404).json({ error: 'Place of Usage not found' });
      }
      console.log("Place of Usage Get Successfully")
      res.status(200).json({ result: getPlaceOfUsageById, message: "Place of Usage get Successfully" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
  }
}
}


module.exports = placeOfUsageController;