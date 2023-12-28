const versionModel = require("../models/versionModel")

const versionController = {
    getAllVersion: async (req, res) => {
        try {
          const versionResult = await versionModel.find();
          res.status(202).json({ result: versionResult, status: 1 });
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Version');
        }
      },
      createVersion: async (req, res) => {
       
        try {
          const {versionNo,  versionRelDate,  lastVersion,  versionChange, additionFeatures} = req.body;
          const versionResult = new versionModel({versionNo,  versionRelDate,  lastVersion,  versionChange, additionFeatures});
          const validationError = versionResult.validateSync();

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
    
                await versionResult.save();
                return res.status(200).json({ message: "Version Successfully Saved", status: 1 });
            } catch (error) {
                console.log(error)
                if (error.errors) {
                    const errors500 = {};
                    for (const key in error.errors) {
                        errors500[key] = error.errors[key].message;
                    }
                    return res.status(500).json({ error: errors500, status: 0 });
                }
    
                return res.status(500).json({ error: 'Internal server error on Version', status: 0 });
            }
        },
         
        updateVersion: async (req, res) => {
          try {
            const versionId = req.params.id; // Assuming desId is part of the URL parameter
            // if (isNaN(desId)) {
            //   return res.status(400).json({ error: 'Invalid desId value' });
            // }
        
            // Create an object with the fields you want to update
            const updateVersionFields = {
              /* Specify the fields and their updated values here */
             versionNo:req.body.versionNo, versionRelDate:req.body.versionRelDate, lastVersion:req.body.lastVersion,  versionChange:req.body.versionChange, additionFeatures: req.body.additionFeatures,// Example: updating the 'name' field
              // Add more fields as needed
            };
        
            // Find the designation by desId and update it
            const versionUpdate = new versionModel(updateVersionFields);
  
            const validationError = versionUpdate.validateSync();
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
            const updateVersion = await versionModel.findOneAndUpdate(
                { _id: versionId },
                updateVersionFields,
                { new: true } // To return the updated document
            );
  
            if (!updateVersion) {
                return res.status(404).json({ error: 'Version not found' });
            }
            console.log("Version Updated Successfully")
            res.status(200).json({ result: updateVersion, message: "Version Updated Successfully" });
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
  deleteVersion: async (req, res) => {
    try {

      const {versionIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = []; 

      for (const versionId of versionIds) {
        // Find and remove each vendor by _id
        const deletedVersion = await versionModel.findOneAndRemove({ _id: versionId });
        console.log(deletedVersion)
        if (!deletedVersion) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`Version with ID ${versionId} not found.`);
          res.status(500).json({ message:  `Version not found.`});
          
        } else {
          console.log(`Version with ID ${versionId} deleted successfully.`);
          deleteResults.push(deletedVersion); 
        }
      }

      return res.status(202).json({ message: 'Version deleted successfully', results: `${deleteResults.length} Version Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getVersionById : async (req, res) => {
    try {
      const versionId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getVersionById = await versionModel.findOne(
          { _id: versionId }// To return the updated document
      );

      if (!getVersionById) {
          return res.status(404).json({ error: 'Version not found' });
      }
      console.log("Version Get Successfully")
      res.status(200).json({ result: getVersionById, message: "Version get Successfully" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
  }
}
}


module.exports = versionController; 