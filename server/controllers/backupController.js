const backupModel = require("../models/backupModel")

const backupController = {
    getAllBackUp: async (req, res) => {
        try {
          const backupResult = await backupModel.find();
          res.status(202).json({ result: backupResult, status: 1 });
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Back Up');
        }
      },
      createBackUp: async (req, res) => {
       
        try {
          const { path, date, time, backupName} = req.body;
          const backupResult = new backupModel({path, date, time, backupName});
          const validationError = backupResult.validateSync();

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
    
                await backupResult.save();
                return res.status(200).json({ message: "Back Up Successfully Saved", status: 1 });
            } catch (error) {
                console.log(error)
                if (error.errors) {
                    const errors500 = {};
                    for (const key in error.errors) {
                        errors500[key] = error.errors[key].message;
                    }
                    return res.status(500).json({ error: errors500, status: 0 });
                }
    
                return res.status(500).json({ error: 'Internal server error on Back Up', status: 0 });
            }
        },
         
        updateBackUp: async (req, res) => {
          try {
            const backUpId = req.params.id; // Assuming desId is part of the URL parameter
            // if (isNaN(desId)) {
            //   return res.status(400).json({ error: 'Invalid desId value' });
            // }
        
            // Create an object with the fields you want to update
            const updateBackUpFields = {
              /* Specify the fields and their updated values here */
             path: req.body.path, date : req.body.date,  time: req.body.time, backupName : req.body.backupName,// Example: updating the 'name' field
              // Add more fields as needed
            };
        
            // Find the designation by desId and update it
            const backupUpdate = new backupModel(updateBackUpFields);
  
            const validationError = backupUpdate.validateSync();
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
            const updateBackUp = await backupModel.findOneAndUpdate(
                { _id: backUpId },
                updateBackUpFields,
                { new: true } // To return the updated document
            );
  
            if (!updateBackUp) {
                return res.status(404).json({ error: 'Back Up not found' });
            }
            console.log("Back Up Updated Successfully")
            res.status(200).json({ result: updateBackUp, message: "Back Up Updated Successfully" });
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
  deleteBackUp: async (req, res) => {
    try {

      const {backUpIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = []; 

      for (const backUpId of backUpIds) {
        // Find and remove each vendor by _id
        const deletedBackUp = await backupModel.findOneAndRemove({ _id: backUpId });
        console.log(deletedBackUp)
        if (!deletedBackUp) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`Back Up with ID ${backUpId} not found.`);
          res.status(500).json({ message:  `Back Up not found.`});
          
        } else {
          console.log(`Back Up with ID ${backUpId} deleted successfully.`);
          deleteResults.push(deletedBackUp); 
        }
      }

      return res.status(202).json({ message: 'Back Up deleted successfully', results: `${deleteResults.length} Back Up Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getBackUpById : async (req, res) => {
    try {
      const backUpId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getBackUpById = await backupModel.findOne(
          { _id: backUpId }// To return the updated document
      );

      if (!getBackUpById) {
          return res.status(404).json({ error: 'Back Up not found' });
      }
      console.log("Back Up Get Successfully")
      res.status(200).json({ result: getBackUpById, message: "back get Successfully" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
  }
}
}


module.exports = backupController; 