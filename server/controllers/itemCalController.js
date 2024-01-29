const itemAddModel = require("../models/itemAddModel");
const itemCalModel = require("../models/itemCalModel")
const itemHistory = require("../models/itemHistory")
const dayjs = require('dayjs')

const itemCalController = {
  getAllItemCals: async (req, res) => {
    try {
      const getAllItemCals = await itemCalModel.find();

      res.status(202).json({ result: getAllItemCals, status: 1 });
      //res.status(200).json(employees);

    } catch (err) {
      console.error(err);
      res.status(500).send('Error on ItemCal');
    }
  },
  createItemCal: async (req, res) => {
    try {
      const {
        calItemId,
        calIMTENo,
        calItemName,
        calItemType,
        calRangeSize,
        calItemMFRNo,
        calLC,
        calItemMake,
        calItemTemperature,
        calItemHumidity,
        calItemUncertainity,
        calItemSOPNo,
        calStandardRef,
        calOBType,
        calCertificateNo,
        calItemCalDate,
        calItemDueDate,
        calItemEntryDate,
        calCalibratedBy,
        calCalibratedById,
        calApprovedBy,
        calBeforeData,
        calStatus,
        calcalibrationData,
        calMasterUsed,
        calItemFreInMonths,
        calPlant,
        calDepartment,
        calSource,
      } = req.body;

      const newItemFields = {
        calItemId,
        calIMTENo,
        calItemName,
        calItemType,
        calRangeSize,
        calItemMFRNo,
        calLC,
        calItemMake,
        calItemTemperature,
        calItemHumidity,
        calItemUncertainity,
        calItemSOPNo,
        calStandardRef,
        calOBType,
        calCertificateNo,
        calItemCalDate,
        calItemDueDate,
        calItemEntryDate,
        calCalibratedBy,
        calCalibratedById,
        calApprovedBy,
        calBeforeData,
        calStatus,
        calcalibrationData,
        calMasterUsed,
        calItemFreInMonths,
        calPlant,
        calDepartment,
        calSource,
      };

      const newItem = new itemCalModel(newItemFields);



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

      const createdItem = await itemCalModel.create(newItemFields);

      if (Object.keys(createdItem).length !== 0) {

        const itemData = await itemAddModel.findById(calItemId)

        const {
          itemIMTENo,
          itemCalDate: itemLastCalDate,
          itemDueDate: itemLastDueDate,
          itemPlant,
          isItemMaster,
          itemAddMasterName,
          itemType,
          itemRangeSize,
          itemRangeSizeUnit,
          itemLC,
          itemLCUnit,
          itemModelNo,
          itemStatus,
          itemReceiptDate,
          itemDepartment,
          itemCurrentLocation,
          itemLastLocation,
          itemCalFreInMonths,
          itemCalAlertDays,
          itemCalibrationSource,
          itemCalibrationDoneAt,
          itemItemMasterName,
          itemItemMasterIMTENo,
          itemCalDate,
          itemDueDate,
          itemCalibratedAt,
          itemCertificateName,
          itemCertificateNo,
          itemOBType,
          itemUncertainity,
          itemUncertainityUnit,
          itemPrevCalData,
          itemCreatedBy,
          itemLastModifiedBy
        } = itemData


        const updateItemFields = {
          itemIMTENo,
          itemCalDate: calItemCalDate,
          itemDueDate: calItemDueDate,
          itemLastDueDate,
          itemLastCalDate,

        }
        const updateResult = await itemAddModel.findOneAndUpdate(
          { _id: calItemId },
          { $set: updateItemFields },
          { new: true }
        );
        console.log("itemUpdated")

        let obSize = [];
        if (createdItem.calItemType === "variable") {
          obSize = calcalibrationData.map(item => {
            return item.calParameter + ":" + item.calOBError
          })
        } else {
          obSize = calcalibrationData.map(item => {

            if (calItemType === "minmax") {
              return item.calParameter + " : " + item.calMinOB + "/" + item.calMaxOB
            } else {
              return item.calParameter + " : " + item.calAverageOB
            }

          })
        }

        const historyRecord = new itemHistory({
          itemId: itemData._id,
          itemCalId: createdItem._id,
          itemPlant,
          isItemMaster,
          itemAddMasterName,
          itemIMTENo,
          itemType,
          itemRangeSize,
          itemRangeSizeUnit,
          itemLC,
          itemLCUnit,
          itemModelNo,
          itemStatus,
          itemReceiptDate,
          itemDepartment,
          itemCurrentLocation,
          itemLastLocation,
          itemLocation: "department",
          itemCalFreInMonths,
          itemCalAlertDays,
          itemCalibrationSource,
          itemCalibrationDoneAt,
          itemItemMasterName,
          itemItemMasterIMTENo,
          itemCalDate: calItemCalDate,
          itemDueDate: calItemDueDate,
          itemCalibratedAt,
          itemCertificateName,
          itemCertificateNo,
          itemCalStatus: calStatus,
          itemCalibratedBy: calCalibratedBy,
          itemCalApprovedBy: calApprovedBy,
          itemOBType,
          itemUncertainity,
          itemUncertainityUnit,
          itemPrevCalData,
          acceptanceCriteria: obSize,
          itemCreatedBy,
          itemLastModifiedBy,
        });


        await historyRecord.save();
      }



      console.log("ItemCal Created Successfully");
      res.status(200).json({ result: createdItem, message: "ItemCal Created Successfully" });
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


  updateItemCal: async (req, res) => {
    try {
      const itemCalId = req.params.id; // Assuming desId is part of the URL parameter

      const itemData = itemCalModel.findById(itemCalId)
      console.log(itemData)
      // if (isNaN(desId)) {
      //   return res.status(400).json({ error: 'Invalid desId value' });
      // }
      const {
        calItemId,
        calIMTENo,
        calItemName,
        calItemType,
        calRangeSize,
        calItemMFRNo,
        calLC,
        calItemMake,
        calItemTemperature,
        calItemHumidity,
        calItemUncertainity,
        calItemSOPNo,
        calStandardRef,
        calOBType,
        calCertificateNo,
        calItemCalDate,
        calItemDueDate,
        calItemEntryDate,
        calCalibratedBy,
        calCalibratedById,
        calApprovedBy,
        calBeforeData,
        calStatus,
        calcalibrationData,
        calMasterUsed,
        calItemFreInMonths,
        calPlant,
        calDepartment,
        calSource,
      } = req.body;
      // Create an object with the fields you want to update
      const updateItemFields = {
        calItemId,
        calIMTENo,
        calItemName,
        calItemType,
        calRangeSize,
        calItemMFRNo,
        calLC,
        calItemMake,
        calItemTemperature,
        calItemHumidity,
        calItemUncertainity,
        calItemSOPNo,
        calStandardRef,
        calOBType,
        calCertificateNo,
        calItemCalDate,
        calItemDueDate,
        calItemEntryDate,
        calCalibratedBy,
        calCalibratedById,
        calApprovedBy,
        calBeforeData,
        calPlant,
        calDepartment,
        calStatus,
        calcalibrationData,
        calMasterUsed,
        calItemFreInMonths,
        calSource,
      };

      // Find the designation by desId and update it
      const itemCalUpdate = new itemCalModel(updateItemFields);

      const validationError = itemCalUpdate.validateSync();
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
      const updateItemCal = await itemCalModel.findOneAndUpdate(
        { _id: itemCalId },
        updateItemFields,
        { new: true } // To return the updated document
      );

      if (!updateItemCal) {
        return res.status(404).json({ error: 'ItemCal not found' });
      } else {

        const itemData = await itemAddModel.findById(calItemId)

        const {
          itemIMTENo,
          itemCalDate: itemLastCalDate,
          itemDueDate: itemLastDueDate,
          
          isItemMaster,
          itemAddMasterName,
          itemType,
          itemRangeSize,
          itemRangeSizeUnit,
          itemLC,
          itemLCUnit,
          itemModelNo,
          itemStatus,
          itemReceiptDate,
          itemDepartment,
          itemCurrentLocation,
          itemLastLocation,
          itemCalFreInMonths,
          itemCalAlertDays,
          itemCalibrationSource,
          itemCalibrationDoneAt,
          itemItemMasterName,
          itemItemMasterIMTENo,
          itemCalDate,
          itemDueDate,
          itemCalibratedAt,
          itemCertificateName,
          itemCertificateNo,
          itemOBType,
          itemUncertainity,
          itemUncertainityUnit,
          itemPrevCalData,
          itemCreatedBy,
          itemLastModifiedBy
        } = itemData


        const updateItemFields = {
          itemIMTENo,
          itemCalDate: calItemCalDate,
          itemDueDate: calItemDueDate,
          itemLastDueDate,
          itemLastCalDate,

        }
        const updateResult = await itemAddModel.findOneAndUpdate(
          { _id: calItemId },
          { $set: updateItemFields },
          { new: true }
        );


        let obSize = [];
        if (createdItem.itemType === "variable") {
          obSize = acceptanceCriteria.map(item => {
            return item.acParameter + ":" + item.acOBError
          })
        } else {


          obSize = acceptanceCriteria.map(item => {

            if (itemOBType === "minmax") {
              return item.acParameter + ":" + item.acMinOB + "/" + item.acMaxOB
            } else {
              return item.acParameter + ":" + item.acAverageOB
            }

          })
        }
        console.log(obSize)
        const historyRecord = new itemHistory({
          itemId: itemData._id,
          
          itemPlant,
          isItemMaster,
          itemAddMasterName,
          itemIMTENo,
          itemType,
          itemRangeSize,
          itemRangeSizeUnit,
          itemLC,
          itemLCUnit,
          itemModelNo,
          itemStatus,
          itemReceiptDate,
          itemDepartment,
          
          itemLocation: "department",
          itemCalFreInMonths,
          itemCalAlertDays,
          itemCalibrationSource,
          itemCalibrationDoneAt,
          itemItemMasterName,
          itemItemMasterIMTENo,
          itemCalDate: calItemCalDate,
          itemDueDate: calItemDueDate,
          itemCalibratedAt,
          itemCertificateName,
          itemCertificateNo,
          itemCalStatus: calStatus,
          itemCalibratedBy: calCalibratedBy,
          itemCalApprovedBy: calApprovedBy,
          itemOBType,
          itemUncertainity,
          itemUncertainityUnit,
          itemPrevCalData,
          acceptanceCriteria: obSize,
          itemCreatedBy,
          itemLastModifiedBy,
        });

        const historyResult = await itemAddModel.findOneAndUpdate(
          { itemCalId : itemCalId },
          { $set: updateItemFields },
          { new: true }
        );
      }


      console.log("ItemCal Updated Successfully")
      res.status(200).json({ result: updateItemCal, message: "ItemCal Updated Successfully" });
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
  deleteItemCal: async (req, res) => {
    try {

      const { itemCalIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = [];


      for (const itemCalId of itemCalIds) {
        // Find and remove each vendor by _id


        const calData = await itemCalModel.findById(itemCalId);
        const itemData = await itemAddModel.findById(calData.calItemId)

        const { itemLastCalDate: itemCalDate, itemLastDueDate: itemDueDate } = itemData
        const updateItemFields = { itemCalDate, itemDueDate }
        const updateResult = await itemAddModel.findOneAndUpdate(
          { _id: calData.calItemId },
          { $set: updateItemFields },
          { new: true }
        );

        const deletedItemCal = await itemCalModel.findOneAndRemove({ _id: itemCalId });
        console.log(deletedItemCal)
        if (!deletedItemCal) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`ItemCal with ID ${itemCalId} not found.`);
          res.status(500).json({ message: `ItemCal with ID not found.` });

        } else {
          console.log(`ItemCal with ID ${itemCalId} deleted successfully.`);

          deleteResults.push(deletedItemCal);
        }
      }

      return res.status(202).json({ message: 'ItemCal deleted successfully', results: `${deleteResults.length} ItemCal Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getAllDistinctCalNames: async (req, res) => {
    try {
      const itemCalResult = await itemCalModel.find().distinct('calItemName');
      res.status(202).json({ result: itemCalResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on ItemAdd Get');
    }
  },




}


module.exports = itemCalController;