const itemAddModel = require("../models/itemAddModel");
const itemDcModel = require("../models/itemDcModel")
const dayjs = require('dayjs')

const itemDcController = {
    getAllItemDc: async (req, res) => {
        try {
          const itemDcResult = await itemDcModel.find();
          res.status(202).json({ result: itemDcResult, status: 1 });
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Item Dc');
        }
      },
      createItemDc: async (req, res) => {
       
        try {
          const {dcPartyName, dcPartyId, dcPartyType, dcPartyCode, dcPartyAddress, dcNo, dcDate, dcReason, dcCommonRemarks,  dcMasterName, dcPartyItems} = req.body;
          const itemDcResult = new itemDcModel({dcPartyName, dcPartyId, dcPartyType, dcPartyCode, dcPartyAddress, dcNo, dcDate, dcReason, dcCommonRemarks, dcMasterName, dcPartyItems});

          const updatePromises = dcPartyItems.map(async (item) => {
        
            const itemData = await itemAddModel.findById(item._id)
            const {itemIMTENo} = itemData
            const updateItemFields = {itemIMTENo, dcStatus: "1", dcCreatedOn : dayjs().format("YYYY-MM-DD")}
            const updateResult = await itemAddModel.findOneAndUpdate(
              { _id: item._id },
              { $set: updateItemFields },
              { new: true }
            );
            console.log(updateResult)
            return updateResult;
          });
          const updatedItems = await Promise.all(updatePromises);
          const validationError = itemDcResult.validateSync();

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
    
                await itemDcResult.save();
                return res.status(200).json({ message: "Item Dc Data Successfully Saved", status: 1 });
            } catch (error) {
                console.log(error)
                if (error.errors) {
                    const errors500 = {};
                    for (const key in error.errors) {
                        errors500[key] = error.errors[key].message;
                    }
                    return res.status(500).json({ error: errors500, status: 0 });
                }
    
                return res.status(500).json({ error: 'Internal server error on Item Dc', status: 0 });
            }
        },
         
      updateItemDc: async (req, res) => {
        try {
          const itemDcId = req.params.id; // Assuming desId is part of the URL parameter
          // if (isNaN(desId)) {
          //   return res.status(400).json({ error: 'Invalid desId value' });
          // }
      
          // Create an object with the fields you want to update
          const updateItemDcFields = {
            /* Specify the fields and their updated values here */
            dcPartyId: req.body.dcPartyId, dcPartyType: req.body.dcPartyType, dcPartyName : req.body.dcPartyName, dcPartyCode : req.body.dcPartyCode, dcPartyAddress : req.body.dcPartyAddress, dcNo : req.body.dcNo, dcDate : req.body.dcDate, dcReason : req.body.dcReason, dcCommonRemarks : req.body.dcCommonRemarks, dcPartyItems : req.body.dcPartyItems // Example: updating the 'name' field
            // Add more fields as needed
          };
      
          // Find the designation by desId and update it
          const itemDcUpdate = new itemDcModel(updateItemDcFields);

          const validationError = itemDcUpdate.validateSync();
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
          const updateItemDc = await itemDcModel.findOneAndUpdate(
              { _id: itemDcId },
              updateItemDcFields,
              { new: true } // To return the updated document
          );

          if (!updateItemDc) {
              return res.status(404).json({ error: 'Item Dc not found' });
          }
          console.log("Item Dc Updated Successfully")
          res.status(200).json({ result: updateItemDc, message: "Item Dc Updated Successfully" });
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
  deleteItemDc: async (req, res) => {
    try {

      const { itemDcIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = []; 

      for (const itemDcId of itemDcIds) {
        // Find and remove each vendor by _id
        const deletedItemDc = await itemDcModel.findOneAndRemove({ _id: itemDcId });
        console.log(deletedItemDc)
        if (!deletedItemDc) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`Item Dc with ID ${itemDcId} not found.`);
          res.status(500).json({ message:  `Item Dc with ID not found.`});
          
        } else {
          console.log(`Item Dc with ID ${itemDcId} deleted successfully.`);
          deleteResults.push(deletedItemDc); 
        }
      }

      return res.status(202).json({ message: 'Item Dc deleted successfully', results: `${deleteResults.length} Item Dc Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getItemDcById : async (req, res) => {
    try {
      const itemDcId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getItemDcById = await itemDcModel.findOne(
          { _id: itemDcId }// To return the updated document
      );

      if (!getItemDcById) {
          return res.status(404).json({ error: 'Item Dc not found' });
      }
      console.log("Item Dc Get Successfully")
      res.status(200).json({ result: getItemDcById, message: "Item Dc get Successfully" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
  }
}

}


module.exports = itemDcController;