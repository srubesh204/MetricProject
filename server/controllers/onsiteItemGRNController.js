const onsiteItemGRNModel = require("../models/onsiteItemGRNModel")

const onsiteItemGRNController = {
    getAllOnsiteItemGRN: async (req, res) => {
        try {
          const onsiteItemGRNResult = await onsiteItemGRNModel.find();
          res.status(202).json({ result: onsiteItemGRNResult, status: 1 });
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Onsite GRN');
        }
      },
      createOnsiteItemGRN: async (req, res) => {
       
        try {
          const {osGrnPartyRefNo,osGrnPartyRefDate, osGrnPartyName, osGrnPartyCode, osGrnPartyAddress, osGrnNo,osGrnDate, osGrnCommonRemarks,osGrnPartItems,osGrnPartyId} = req.body;
          const onsiteItemGRNResult = new onsiteItemGRNModel({ osGrnPartyRefNo, osGrnPartyRefDate, osGrnPartyName,osGrnPartyCode,osGrnPartyAddress, osGrnNo, osGrnDate, osGrnCommonRemarks,osGrnPartItems});
          const validationError = onsiteItemGRNResult.validateSync();

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
    
                await onsiteItemGRNResult.save();
                return res.status(200).json({ message: "Onsite GRN Data Successfully Saved", status: 1 });
            } catch (error) {
                console.log(error)
                if (error.errors) {
                    const errors500 = {};
                    for (const key in error.errors) {
                        errors500[key] = error.errors[key].message;
                    }
                    return res.status(500).json({ error: errors500, status: 0 });
                }
    
                return res.status(500).json({ error: 'Internal server error on Onsite GRN', status: 0 });
            }
        },
         
      updateOnsiteItemGRN: async (req, res) => {
        try {
          const onsiteItemGRNId = req.params.id; // Assuming desId is part of the URL parameter
          // if (isNaN(desId)) {
          //   return res.status(400).json({ error: 'Invalid desId value' });
          // }
      
          // Create an object with the fields you want to update
          const updateOnsiteItemGRNFields = {
            /* Specify the fields and their updated values here */
            osGrnPartyRefNo: req.body.osGrnPartyRefNo, osGrnPartyRefDate : req.body.osGrnPartyRefDate, osGrnPartItems: req.body.osGrnPartItems,  osGrnPartyName : req.body.osGrnPartyName, osGrnPartyCode : req.body.osGrnPartyCode, osGrnPartyAddress : req.body.osGrnPartyAddress, osGrnNo : req.body.osGrnNo, osGrnDate : req.body.osGrnDate, osGrnCommonRemarks : req.body.osGrnCommonRemarks,// Example: updating the 'name' field
            // Add more fields as needed
          };
      
          // Find the designation by desId and update it
          const onsiteItemGRNUpdate = new onsiteItemGRNModel(updateOnsiteItemGRNFields);

          const validationError = onsiteItemGRNUpdate.validateSync();
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
          const updateOnsiteItemGRN = await onsiteItemGRNModel.findOneAndUpdate(
              { _id: onsiteItemGRNId },
              updateOnsiteItemGRNFields,
              { new: true } // To return the updated document
          );

          if (!updateOnsiteItemGRN) {
              return res.status(404).json({ error: 'Onsite GRN not found' });
          }
          console.log("Onsite GRN Updated Successfully")
          res.status(200).json({ result: updateOnsiteItemGRN, message: "Onsite GRN Updated Successfully" });
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
  deleteOnsiteItemGRN: async (req, res) => {
    try {

      const { onsiteItemGRNIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = []; 

      for (const onsiteItemGRNId of onsiteItemGRNIds) {
        // Find and remove each vendor by _id
        const deletedOnsiteItemGRN = await onsiteItemGRNModel.findOneAndRemove({ _id: onsiteItemGRNId });
        console.log(deletedOnsiteItemGRN)
        if (!deletedOnsiteItemGRN) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`Onsite GRN with ID ${onsiteItemGRNId} not found.`);
          res.status(500).json({ message:  `Onsite GRN with ID not found.`});
          
        } else {
          console.log(`Onsite GRN with ID ${onsiteItemGRNId} deleted successfully.`);
          deleteResults.push(deletedOnsiteItemGRN); 
        }
      }

      return res.status(202).json({ message: 'Onsite GRN deleted successfully', results: `${deleteResults.length} Onsite GRN Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getOnsiteItemGRNById : async (req, res) => {
    try {
      const onsiteItemGRNId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getOnsiteItemGRNById = await onsiteItemGRNModel.findOne(
          { _id: onsiteItemGRNId }// To return the updated document
      );

      if (!getOnsiteItemGRNById) {
          return res.status(404).json({ error: 'Onsite GRN not found' });
      }
      console.log("Onsite GRN Get Successfully")
      res.status(200).json({ result: getOnsiteItemGRNById, message: "Onsite GRN get Successfully" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
  }
}

}


module.exports = onsiteItemGRNController;