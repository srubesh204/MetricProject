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
      const {
        itemMasterRef,
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
        acceptanceCriteria
      } = req.body;
      const itemAddResult = new itemAddModel({
        itemMasterRef,
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
        acceptanceCriteria
      });
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
      const { itemMasterRef,
        itemAddMasterName ,
        itemIMTENo ,
        itemImage ,
        itemType ,
        itemRangeSize ,
        itemRangeSizeUnit ,
        itemMFRNo ,
        itemLC ,
        itemLCUnit ,
        itemMake ,
        itemModelNo ,
        itemStatus ,
        itemReceiptDate ,
        itemDepartment ,
        itemArea ,
        itemPlaceOfUsage ,
        itemCalFreInMonths ,
        itemCalAlertDays ,
        itemCalibrationSource ,
        itemItemMasterName ,
        itemItemMasterIMTENo ,
        itemItemMasterDue ,
        itemCalibrationDoneAt ,    
        itemSupplier ,
        itemOEM ,
        itemCalDate ,
        itemDueDate ,
        itemCalibratedAt ,
        itemCertificateName ,
        itemPartName ,
        acceptanceCriteria  } = req.body;
      // Create an object with the fields you want to update
      const updateItemFields = {
        itemMasterRef,
        itemAddMasterName ,
        itemIMTENo ,
        itemImage ,
        itemType ,
        itemRangeSize ,
        itemRangeSizeUnit ,
        itemMFRNo ,
        itemLC ,
        itemLCUnit ,
        itemMake ,
        itemModelNo ,
        itemStatus ,
        itemReceiptDate ,
        itemDepartment ,
        itemArea ,
        itemPlaceOfUsage ,
        itemCalFreInMonths ,
        itemCalAlertDays ,
        itemCalibrationSource ,
        itemItemMasterName ,
        itemItemMasterIMTENo ,
        itemItemMasterDue ,
        itemCalibrationDoneAt ,    
        itemSupplier ,
        itemOEM ,
        itemCalDate ,
        itemDueDate ,
        itemCalibratedAt ,
        itemCertificateName ,
        itemPartName ,
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
      const itemAddResult = await itemAddModel.find().distinct('itemMasterName');
      res.status(202).json({ result: itemAddResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on ItemAdd Get');
    }
  },
  getItemAddByName: async (req, res) => {
    try {
      const {itemMasterName} = req.body
      const getItemAddByName = await itemAddModel.find({itemMasterName: itemMasterName})  // To return the updated document);
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
      const {itemDepartment} = req.body
      const getItemAddByDepName = await itemAddModel.find({itemDepartment: itemDepartment})  // To return the updated document);
      res.status(202).json({ result: getItemAddByDepName, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on ItemAdd Get');
    }
  },
}


module.exports = itemAddController;