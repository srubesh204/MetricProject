const itemMasterModel = require("../models/itemMasterModel")

const itemMasterControllers = {
    getAllItemMasters: async (req, res) => {
        try {
          const itemMasterResult = await itemMasterModel.find();
          res.status(200).json(itemMasterResult);
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Item Master');
        }
      },
      createItemMaster: async (req, res) => {
       
        try {
          const { itemType, itemDescription, itemPrefix, itemFq, cabAlertInDay, wiNo, unCertainty, unCertaintyUnit, standardRef, itemImageName, workInsName, status,calibrationPoints} = req.body;
          const itemMasterResult = new itemMasterModel({ itemType, itemDescription, itemPrefix, itemFq, cabAlertInDay, wiNo, unCertainty, unCertaintyUnit, standardRef, itemImageName, workInsName, status, calibrationPoints});
          await itemMasterResult.save();
          res.status(200).json({message: "Item Master Data Successfully Saved",status: 1});
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: error,status: 0});
        }
      },
      updateItemMaster: async (req, res) => {
        try {
          const imId = req.params.id; // Assuming desId is part of the URL parameter
          // if (isNaN(desId)) {
          //   return res.status(400).json({ error: 'Invalid desId value' });
          // }
      
          // Create an object with the fields you want to update
          const { itemType, itemDescription, itemPrefix, itemFq, cabAlertInDay, wiNo, unCertainty, unCertaintyUnit, standardRef, itemImageName, workInsName, status, calibrationPoints} = req.body;

          const updateImFields = {
            itemType,
            itemDescription,
            itemPrefix,
            itemFq,
            cabAlertInDay,
            wiNo, 
            unCertainty,
            unCertaintyUnit,
            standardRef,
            itemImageName,
            workInsName,
            status,
            calibrationPoints


              // Add more fields as needed
          };
      
          // Find the designation by desId and update it
          const updateItemMaster = await itemMasterModel.findOneAndUpdate(
            {_id : imId},
            updateImFields,
            { new: true } // To return the updated document
          );
      
          if (!updateItemMaster) {
            return res.status(404).json({ error: 'Item Master not found' });
          }
      
          res.status(200).json(updateItemMaster);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      deleteItemMaster : async (req, res) => {
        try {
          const imId = req.params.id; // Assuming id is part of the URL parameter
      
          // Find the designation by _id and remove it
          const deleteItemMaster = await itemMasterModel.findOneAndRemove(
            { _id: imId } // Pass the _id as an object
          );
      
          if (!deleteItemMaster) {
            return res.status(404).json({ error: 'ItemMaster not found' });
          }
      
          res.status(200).json({ message: 'ItemMaster deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      }


module.exports = itemMasterControllers;