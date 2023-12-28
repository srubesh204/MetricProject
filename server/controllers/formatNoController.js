const formatNoModel = require("../models/formatNoModel")

const formatNoController = {
    getAllFormatNo: async (req, res) => {
        try {
          const formatNoResult = await formatNoModel.find();
          res.status(202).json({ result: formatNoResult, status: 1 });
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Format No');
        }
      },
      createFormatNo: async (req, res) => {
       
        try {
          const { fDc, fGrn, fCertficate, fHistoryCard, fTotalList, fCertificatePrefix,  fDeTemperature, fDeHumidity} = req.body;
          const formatNoResult = new formatNoModel({fDc, fGrn, fCertficate, fHistoryCard, fTotalList, fCertificatePrefix,  fDeTemperature, fDeHumidity});
          const validationError = formatNoResult.validateSync();

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
    
                await formatNoResult.save();
                return res.status(200).json({ message: "Format No Successfully Saved", status: 1 });
            } catch (error) {
                console.log(error)
                if (error.errors) {
                    const errors500 = {};
                    for (const key in error.errors) {
                        errors500[key] = error.errors[key].message;
                    }
                    return res.status(500).json({ error: errors500, status: 0 });
                }
    
                return res.status(500).json({ error: 'Internal server error on Format No', status: 0 });
            }
        },
         
        updateFormatNo: async (req, res) => {
          try {
            const formatNoId = req.params.id; // Assuming desId is part of the URL parameter
            // if (isNaN(desId)) {
            //   return res.status(400).json({ error: 'Invalid desId value' });
            // }
        
            // Create an object with the fields you want to update
            const updateFormatNoFields = {
              /* Specify the fields and their updated values here */
             fDc: req.body.fDc, fGrn: req.body.fGrn, fCertficate: req.body.fCertificate, fHistoryCard: req.body.fHistoryCard, fTotalList: req.body.fTotalList, fCertificatePrefix: req.body.fCertificatePrefix,  fDeTemperature: req.body. fDeTemperature, fDeHumidity: req.body.fDeHumidity,// Example: updating the 'name' field
              // Add more fields as needed
            };
        
            // Find the designation by desId and update it
            const formatNoUpdate = new formatNoModel(updateFormatNoFields);
  
            const validationError = formatNoUpdate.validateSync();
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
            const updateFormatNo = await formatNoModel.findOneAndUpdate(
                { _id: formatNoId },
                updateFormatNoFields,
                { new: true } // To return the updated document
            );
  
            if (!updateFormatNo) {
                return res.status(404).json({ error: 'Format No not found' });
            }
            console.log("Format No Updated Successfully")
            res.status(200).json({ result: updateFormatNo, message: "Format No Updated Successfully" });
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
  deleteFormatNo: async (req, res) => {
    try {

      const {formatNoIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = []; 

      for (const formatNoId of formatNoIds) {
        // Find and remove each vendor by _id
        const deletedFormatNo = await formatNoModel.findOneAndRemove({ _id: formatNoId });
        console.log(deletedFormatNo)
        if (!deletedFormatNo) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`Format No with ID ${formatNoId} not found.`);
          res.status(500).json({ message:  `Format No not found.`});
          
        } else {
          console.log(`Format No with ID ${formatNoId} deleted successfully.`);
          deleteResults.push(deletedFormatNo); 
        }
      }

      return res.status(202).json({ message: 'Format No deleted successfully', results: `${deleteResults.length} Format No Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getFormatNoById : async (req, res) => {
    try {
      const formatNoId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getFormatNoById = await formatNoModel.findOne(
          { _id: formatNoId }// To return the updated document
      );

      if (!getFormatNoById) {
          return res.status(404).json({ error: 'Format No not found' });
      }
      console.log("Format No Get Successfully")
      res.status(200).json({ result: getFormatNoById, message: "Format No get Successfully" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
  }
}
}


module.exports = formatNoController; 