const mailConfigModel = require("../models/mailConfigModel")

const mailConfigController = {
    getAllMailConfig: async (req, res) => {
        try {
          const mailConfigResult = await mailConfigModel.find();
          res.status(202).json({ result: mailConfigResult, status: 1 });
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Mail Configuration');
        }
      },
      createMailConfig: async (req, res) => {
       
        try {
          const { mailId, password, partNumber, inMailServer, outMailServer} = req.body;
          const mailConfigResult = new mailConfigModel({mailId, password, partNumber, inMailServer, outMailServer});
          const validationError = mailConfigResult.validateSync();

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
    
                await mailConfigResult.save();
                return res.status(200).json({ message: "Mail Configuration Successfully Saved", status: 1 });
            } catch (error) {
                console.log(error)
                if (error.errors) {
                    const errors500 = {};
                    for (const key in error.errors) {
                        errors500[key] = error.errors[key].message;
                    }
                    return res.status(500).json({ error: errors500, status: 0 });
                }
    
                return res.status(500).json({ error: 'Internal server error on Mail Configuration', status: 0 });
            }
        },
         
        updateMailConfig: async (req, res) => {
          try {
            const mailConfigId = req.params.id; // Assuming desId is part of the URL parameter
            // if (isNaN(desId)) {
            //   return res.status(400).json({ error: 'Invalid desId value' });
            // }
        
            // Create an object with the fields you want to update
            const updateMailConfigFields = {
              /* Specify the fields and their updated values here */
              mailId: req.body.mailId, password : req.body.password,  partNumber: req.body.partNumber, inMailServer : req.body.inMailServer, outMailServer : req.body.outMailServer// Example: updating the 'name' field
              // Add more fields as needed
            };
        
            // Find the designation by desId and update it
            const mailConfigUpdate = new mailConfigModel(updateMailConfigFields);
  
            const validationError = mailConfigUpdate.validateSync();
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
            const updateMailConfig = await mailConfigModel.findOneAndUpdate(
                { _id: mailConfigId },
                updateMailConfigFields,
                { new: true } // To return the updated document
            );
  
            if (!updateMailConfig) {
                return res.status(404).json({ error: 'Mail configuration not found' });
            }
            console.log("Mail configuration Updated Successfully")
            res.status(200).json({ result: updateMailConfig, message: "Mail configuration Updated Successfully" });
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
  deleteMailConfig: async (req, res) => {
    try {

      const {mailConfigIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = []; 

      for (const mailConfigId of mailConfigIds) {
        // Find and remove each vendor by _id
        const deletedMailConfig = await mailConfigModel.findOneAndRemove({ _id: mailConfigId });
        console.log(deletedMailConfig)
        if (!deletedMailConfig) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`Mail Configuration with ID ${mailConfigId} not found.`);
          res.status(500).json({ message:  `Mail Configuration with ID not found.`});
          
        } else {
          console.log(`Mail Configuration with ID ${mailConfigId} deleted successfully.`);
          deleteResults.push(deletedMailConfig); 
        }
      }

      return res.status(202).json({ message: 'Mail Configuration deleted successfully', results: `${deleteResults.length} Mail Configuration Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getMailConfigById : async (req, res) => {
    try {
      const mailConfigId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getMailConfigById = await mailConfigModel.findOne(
          { _id: mailConfigId }// To return the updated document
      );

      if (!getMailConfigById) {
          return res.status(404).json({ error: 'Mail Configuration not found' });
      }
      console.log("Mail Configuration Get Successfully")
      res.status(200).json({ result: getMailConfigById, message: "Mail Configuration get Successfully" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
  }
}
}


module.exports = mailConfigController;