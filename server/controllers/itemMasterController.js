const itemMasterModel = require("../models/itemMasterModel")

const itemMasterController = {
    getAllItemMasters: async (req, res) => {
        try {
          const itemMasterResult = await itemMasterModel.find();
          res.status(202).json({ result: itemMasterResult, status: 1 });
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Item Master');
        }
      },
      createItemMaster: async (req, res) => {
       
        try {
          const { itemType, itemDescription, itemPrefix, itemFqInMonths, calAlertInDay, SOPNo, uncertainty, uncertaintyUnit, standardRef, itemMasterImage, itemImageName, workInsName, status,calibrationPoints} = req.body;
          const itemMasterResult = new itemMasterModel({ itemType, itemDescription, itemPrefix, itemFqInMonths, calAlertInDay, SOPNo, uncertainty, uncertaintyUnit, standardRef, itemMasterImage, itemImageName, workInsName, status,calibrationPoints});
          const validationError = itemMasterResult.validateSync();

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
    
                await itemMasterResult.save();
                return res.status(200).json({ message: "Item Master Data Successfully Saved", status: 1 });
            }catch (error) {
              console.log(error)
              if (error.errors) {
                  const errors500 = {};
                  for (const key in error.errors) {
                      errors500[key] = error.errors[key].message;
                  }
                  return res.status(500).json({ error: errors500, status: 0 });
              }
  
              return res.status(500).json({ error: 'Internal server error on Item Master', status: 0 });
          }
      },
      updateItemMaster: async (req, res) => {
        try {
          const imId = req.params.id; // Assuming desId is part of the URL parameter
          // if (isNaN(desId)) {
          //   return res.status(400).json({ error: 'Invalid desId value' });
          // }
      
          // Create an object with the fields you want to update
          const { itemType, itemDescription, itemPrefix, itemFqInMonths, calAlertInDay, SOPNo, uncertainty, uncertaintyUnit, standardRef,itemMasterImage,  itemImageName, workInsName, status, calibrationPoints} = req.body;

          const updateImFields = {
            itemType,
            itemDescription,
            itemPrefix,
            itemFqInMonths,
            calAlertInDay,
            SOPNo, 
            uncertainty,
            uncertaintyUnit,
            standardRef,
            itemMasterImage,
            itemImageName,
            workInsName,
            status,
            calibrationPoints


              // Add more fields as needed
          };
      
          // Find the designation by desId and update it
          const itemMasterUpdate = new itemMasterModel(updateImFields);

          const validationError = itemMasterUpdate.validateSync();
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
          const updateItemMaster = await itemMasterModel.findOneAndUpdate(
              { _id: imId },
              updateImFields,
              { new: true } // To return the updated document
          );

          if (!updateItemMaster) {
              return res.status(404).json({ error: 'Item Master not found' });
          }
          console.log("Item Master Updated Successfully")
          res.status(200).json({ result: updateItemMaster, message: "Item Master Updated Successfully" });
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
  deleteItemMaster: async (req, res) => {
    try {
  
      const { itemMasterIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = []; 
  
      for (const itemMasterId  of itemMasterIds ) {
        // Find and remove each vendor by _id
        const deletedItemMaster = await itemMasterModel.findOneAndRemove({ _id: itemMasterId  });
        console.log(deletedItemMaster)
        if (!deletedItemMaster) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`ItemMaster with ID ${itemMasterId} not found.`);
          res.status(500).json({ message:  `ItemMaster with ID not found.`});
          
        } else {
          console.log(`ItemMaster with ID ${itemMasterId} deleted successfully.`);
          deleteResults.push(deletedItemMaster); 
        }
      }
  
      return res.status(202).json({ message: 'ItemMaster deleted successfully', results: `${deleteResults.length} ItemMaster Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getItemMasterById : async (req, res) => {
    try {
      const itemMasterId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getItemMasterById = await itemMasterModel.findOne(
          { _id: itemMasterId }// To return the updated document
      );

      if (!getItemMasterById) {
          return res.status(404).json({ error: 'Item Master not found' });
      }
      console.log("Item Master Get Successfully")
      res.status(200).json({ result: getItemMasterById, message: "Item Master get Successfully" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
  }
}

}
  

module.exports = itemMasterController;