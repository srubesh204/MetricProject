const itemAddModel = require("../models/itemAddModel")
const dayjs = require('dayjs')

const itemAddController = {
  getAllItemAdds: async (req, res) => {
    try {
      const itemAddResult = await itemAddModel.find();
      console.log(dayjs().format("YYYY-MM-DD"))
      res.status(202).json({ result: itemAddResult, status: 1 });
      //res.status(200).json(employees);

    } catch (err) {
      console.error(err);
      res.status(500).send('Error on ItemAdd');
    }
  },
  createItemAdd: async (req, res) => {
    try {
      const {
        itemMasterRef,
        selectedItemMaster,
        isItemMaster,
        itemAddMasterName,
        itemIMTENo,
        itemImage,
        itemType,
        itemRangeSize,
        itemRangeSizeUnit,
        itemMFRNo,
        itemLC,
        itemLCUnit,
        itemMake,
        itemModelNo,
        itemStatus,
        itemReceiptDate,
        itemDepartment,
        itemArea,
        itemPlaceOfUsage,
        itemCalFreInMonths,
        itemCalAlertDays,
        itemCalibrationSource,
        itemItemMasterName,
        itemItemMasterIMTENo,
        itemItemMasterDue,
        itemCalibrationDoneAt,
        itemSupplier,
        itemOEM,
        itemCalDate,
        itemDueDate,
        itemCalibratedAt,
        itemCertificateName,
        itemPartName,
        itemUncertainity,
        itemOBType,
        acceptanceCriteria,
        createdAt // Assuming createdAt is part of the request body
      } = req.body;
  
      const newItemFields = {
        itemMasterRef,
        selectedItemMaster,
        isItemMaster,
        itemAddMasterName,
        itemIMTENo,
        itemImage,
        itemType,
        itemRangeSize,
        itemRangeSizeUnit,
        itemMFRNo,
        itemLC,
        itemLCUnit,
        itemMake,
        itemModelNo,
        itemStatus,
        itemReceiptDate,
        itemDepartment,
        itemArea,
        itemPlaceOfUsage,
        itemCalFreInMonths,
        itemCalAlertDays,
        itemCalibrationSource,
        itemItemMasterName,
        itemItemMasterIMTENo,
        itemItemMasterDue,
        itemCalibrationDoneAt,
        itemSupplier,
        itemOEM,
        itemCalDate,
        itemDueDate,
        itemCalibratedAt,
        itemCertificateName,
        itemPartName,
        itemUncertainity,
        itemOBType,
        acceptanceCriteria,
        createdAt // If createdAt is necessary for the creation, include it here
      };
  
      const newItem = new itemAddModel(newItemFields);
  
      const validationError = newItem.validateSync();
      if (validationError) {
        const validationErrors = {};
  
        if (validationError.errors) {
          for (const key in validationError.errors) {
            validationErrors[key] = validationError.errors[key].message;
          }
        }
  
        return res.status(400).json({
          errors: validationErrors
        });
      }
  
      const createdItem = await itemAddModel.create(newItemFields);
      console.log("ItemAdd Created Successfully");
      res.status(200).json({ result: createdItem, message: "ItemAdd Created Successfully" });
    } catch (error) {
      console.log(error);
  
      if (error.code === 11000) {
        return res.status(500).json({ error: 'Duplicate Value Not Accepted' });
      }
  
      const errors500 = {};
      for (const key in error.errors) {
        errors500[key] = error.errors[key].message;
      }
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
    }
  },
  

  updateItemAdd: async (req, res) => {
    try {
      const itemAddId = req.params.id; // Assuming desId is part of the URL parameter

      const itemData = itemAddModel.findById(itemAddId)
      console.log(itemData)
      // if (isNaN(desId)) {
      //   return res.status(400).json({ error: 'Invalid desId value' });
      // }
      const { 
        itemMasterRef,
        itemAddMasterName,
        selectedItemMaster,
        isItemMaster,
        itemIMTENo,
        itemImage,
        itemType,
        itemRangeSize,
        itemRangeSizeUnit,
        itemMFRNo,
        itemLC,
        itemLCUnit,
        itemMake,
        itemModelNo,
        itemStatus,
        itemReceiptDate,
        itemDepartment,
        itemArea,
        itemPlaceOfUsage,
        itemCalFreInMonths,
        itemCalAlertDays,
        itemCalibrationSource,
        itemItemMasterName,
        itemItemMasterIMTENo,
        itemItemMasterDue,
        itemCalibrationDoneAt,
        itemSupplier,
        itemOEM,
        itemCalDate,
        itemDueDate,
        itemCalibratedAt,
        itemCertificateName,
        itemPartName,
        itemUncertainity,
        itemOBType,
        acceptanceCriteria,
        } = req.body;
      // Create an object with the fields you want to update
      const updateItemFields = {
        itemMasterRef,
        itemAddMasterName,
        selectedItemMaster,
        isItemMaster,
        itemIMTENo,
        itemImage,
        itemType,
        itemRangeSize,
        itemRangeSizeUnit,
        itemMFRNo,
        itemLC,
        itemLCUnit,
        itemMake,
        itemModelNo,
        itemStatus,
        itemReceiptDate,
        itemDepartment,
        itemArea,
        itemPlaceOfUsage,
        itemCalFreInMonths,
        itemCalAlertDays,
        itemCalibrationSource,
        itemItemMasterName,
        itemItemMasterIMTENo,
        itemItemMasterDue,
        itemCalibrationDoneAt,
        itemSupplier,
        itemOEM,
        itemCalDate,
        itemDueDate,
        itemCalibratedAt,
        itemCertificateName,
        itemPartName,
        itemUncertainity,
        itemOBType,
        acceptanceCriteria,
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
        console.log(error)
        return res.status(500).json({ error: 'Duplicate Value Not Accepted' });

      }
      const errors500 = {};
      for (const key in error.errors) {
        errors500[key] = error.errors[key].message;
      }
      console.log(error)
      res.status(500).json({ error: error, status: 0 });
    }
  },
  deleteItemAdd: async (req, res) => {
    try {

      const { itemAddIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = [];

      for (const itemAddId of itemAddIds) {
        // Find and remove each vendor by _id
        const deletedItemAdd = await itemAddModel.findOneAndRemove({ _id: itemAddId });
        console.log(deletedItemAdd)
        if (!deletedItemAdd) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`ItemAdd with ID ${itemAddId} not found.`);
          res.status(500).json({ message: `ItemAdd with ID not found.` });

        } else {
          console.log(`ItemAdd with ID ${itemAddId} deleted successfully.`);
          deleteResults.push(deletedItemAdd);
        }
      }

      return res.status(202).json({ message: 'ItemAdd deleted successfully', results: `${deleteResults.length} ItemAdd Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getItemAddById: async (req, res) => {
    try {
      const itemAddId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getItemAddById = await itemAddModel.findOne(
        { _id: itemAddId }// To return the updated document
      );

      if (!getItemAddById) {
        return res.status(404).json({ error: 'Item Add not found' });
      }
      console.log("Item Master Get Successfully")
      res.status(200).json({ result: getItemAddById, message: "Item Master get Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
    }
  },
  getItemAddByIMTESort: async (req, res) => {
    try {
      const itemAddResult = await itemAddModel.find().sort({ itemIMTENo: -1 }).select('itemIMTENo');
      res.status(202).json({ result: itemAddResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on ItemAdd Get');
    }
  },
  getDistinctItemName: async (req, res) => {
    try {
      const itemAddResult = await itemAddModel.find({ isItemMaster: "1" }).distinct('itemAddMasterName');
      res.status(202).json({ result: itemAddResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on ItemAdd Get');
    }
  },
  getItemAddByName: async (req, res) => {
    try {
      const { itemItemMasterName } = req.body
      const getItemAddByName = await itemAddModel.find({ itemAddMasterName: itemItemMasterName })  // To return the updated document);
      res.status(202).json({ result: getItemAddByName, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on ItemAdd Get');
    }
  },
  getItemAdd: async (req, res) => {
    try {
      const itemAddResult = await itemAddModel.find().distinct("itemMasterName");
      res.status(202).json({ result: itemAddResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on ItemAdd');
    }
  },
  getDistinctItemDepartments: async (req, res) => {
    try {
      const itemDepartments = await itemAddModel.find().distinct('itemDepartment');
      res.status(202).json({ result: itemDepartments, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on ItemAdd Get');
    }
  },
  getItemAddByDepName: async (req, res) => {
    try {
      const { itemDepartment } = req.body
      const getItemAddByDepName = await itemAddModel.find({ itemDepartment: itemDepartment })  // To return the updated document);
      res.status(202).json({ result: getItemAddByDepName, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on ItemAdd Get');
    }
  },

  getitemAddMasterName: async (req, res) => {
    try {
      const { itemAddMasterName } = req.body
      const getItemAddMasterName = await itemAddModel.find({ itemAddMasterName: itemAddMasterName })  // To return the updated document);
      res.status(202).json({ result: getItemAddMasterName, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on getitemAddMasterName Get');
    }
  },
  changeDepartmentUpdate: async (req, res) => {
    try {
      // Assuming desId is part of the URL parameter

      
      // if (isNaN(desId)) {
      //   return res.status(400).json({ error: 'Invalid desId value' });
      // }
     
      const {itemIds, itemDepartment} = req.body

      const updatePromises = itemIds.map(async (itemId) => {
        
        const itemData = await itemAddModel.findById(itemId)
        const {itemDepartment: itemLastLocation , itemIMTENo} = itemData
        const updateItemFields = {itemIMTENo, itemDepartment, itemLastLocation}
        const updateResult = await itemAddModel.findOneAndUpdate(
          { _id: itemId._id },
          { $set: updateItemFields },
          { new: true }
        );
        console.log(updateResult)
        return updateResult;
      });
      const updatedItems = await Promise.all(updatePromises);
     
      console.log("ItemAdd Updated Successfully")
      res.status(200).json({ result: updatedItems, message: "ItemAdd Updated Successfully" });
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        console.log(error)
        return res.status(500).json({ error: 'Duplicate Value Not Accepted' });

      }
      const errors500 = {};
      for (const key in error.errors) {
        errors500[key] = error.errors[key].message;
      }
      console.log(error)
      res.status(500).json({ error: error, status: 0 });
    }
  },
  


}


module.exports = itemAddController;