const itemAddModel = require("../models/itemAddModel")

const itemAddController = {
    getAllItemAdds: async (req, res) => {
        try {
          const itemAddResult = await itemAddModel.find();
          res.status(202).json({ result: itemAddResult, status: 1 });
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on ItemAdd');
        }
      },
      createItemAdd: async (req, res) => {
       
        try {
          const { selectItemMasterType, createImteNo, showImteNo, itemImageName, itemType, itemMfrNo, itemMake, itemStatus, range, lc, modelNo, itemReceiptDate, itemDepartment, acceptanceCriteria } = req.body;
          const itemAddResult = new itemAddModel({ selectItemMasterType, createImteNo, showImteNo, itemImageName, itemType, itemMfrNo, itemMake, itemStatus, range, lc, modelNo, itemReceiptDate, itemDepartment, acceptanceCriteria });
          const validationError = itemAddResult.validateSync();

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
    
                await itemAddResult.save();
                return res.status(200).json({ message: "ItemAdd Data Successfully Saved", status: 1 });
            } catch (error) {
                console.log(error)
                if (error.errors) {
                    const errors500 = {};
                    for (const key in error.errors) {
                        errors500[key] = error.errors[key].message;
                    }
                    return res.status(500).json({ error: errors500, status: 0 });
                }
    
                return res.status(500).json({ error: 'Internal server error on ItemAdd', status: 0 });
            }
        },
         
      updateItemAdd: async (req, res) => {
        try {
          const itemAddId = req.params.id; // Assuming desId is part of the URL parameter
          // if (isNaN(desId)) {
          //   return res.status(400).json({ error: 'Invalid desId value' });
          // }
          const { selectItemMasterType, createImteNo, showImteNo, itemImageName, itemType, itemMfrNo, itemMake, itemStatus, range, lc, modelNo, itemReceiptDate, itemDepartment, acceptanceCriteria } = req.body;
          // Create an object with the fields you want to update
          const updateItemFields = {
            selectItemMasterType, 
            createImteNo,
            showImteNo, 
            itemImageName,
            itemType,
            itemMfrNo, 
            itemMake,
            itemStatus,
            range,
            lc, 
            modelNo, 
            itemReceiptDate,
            itemDepartment,
            acceptanceCriteria
          };
      
          // Find the designation by desId and update it
          const itemAddUpdate = new itemAddModel(updateItemFields);

          const validationError = itemAddUpdate.validateSync();
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
          const updateItemAdd = await itemAddModel.findOneAndUpdate(
              { _id: itemAddId },
              updateItemFields,
              { new: true } // To return the updated document
          );

          if (!updateItemAdd) {
              return res.status(404).json({ error: 'ItemAdd not found' });
          }
          console.log("ItemAdd Updated Successfully")
          res.status(200).json({ result: updateItemAdd, message: "ItemAdd Updated Successfully" });
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
  deleteItemAdd: async (req, res) => {
    try {
        const itemAddId = req.params.id; // Assuming id is part of the URL parameter

        // Find the designation by _id and remove it
        const deleteItemAdd = await itemAddModel.findOneAndRemove(
            { _id: itemAddId } // Pass the _id as an object
        );

        if (!deleteItemAdd) {
            return res.status(404).json({ error: 'ItemAdd not found' });
        }

        res.status(202).json({ message: 'ItemAdd detail deleted successfully' ,result: deleteItemAdd });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
}
}


module.exports = itemAddController;