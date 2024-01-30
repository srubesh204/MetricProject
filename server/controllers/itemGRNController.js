const itemGRNModel = require("../models/itemGRNModel")
const itemAddModel = require('../models/itemAddModel');
const itemHistory = require("../models/itemHistory");
const mongoose = require('mongoose');


const itemGRNController = {
  getAllItemGRN: async (req, res) => {
    try {
      const itemGRNResult = await itemGRNModel.find();
      res.status(202).json({ result: itemGRNResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Item GRN');
    }
  },
  createItemGRN: async (req, res) => {


    try {
      const {
        grnPartyRefNo,
        grnPartyId,
        grnPartyRefDate,
        grnPartyName,
        grnPartyCode,
        grnPartyAddress,
        grnNo,
        grnDate,
        grnCommonRemarks,
        grnPlant,
        grnDepartment,
        grnItemId,
        grnItemAddMasterName,
        grnItemType,
        grnItemIMTENo,
        grnItemRangeSize,
        grnItemRangeSizeUnit,
        grnItemMFRNo,
        grnItemLC,
        grnItemLCUnit,
        grnItemMake,
        grnItemModelNo,
        grnItemReceiptDate,
        grnItemDepartment,
        grnItemArea,
        grnItemPlaceOfUsage,
        grnItemCalFreInMonths,
        grnItemCalAlertDays,
        grnItemCalibrationSource,
        grnItemCalibrationDoneAt,
        grnItemCalibratedAt,
        grnItemOBType,
        grnItemStatus,
        grnAcCriteria,
        grnItemUncertainity,
        grnItemCalDate,
        grnItemDueDate,
        grnItemCertificateStatus,
        grnItemCertificateNo,
        grnItemCertificate,
        grnUncertainity,
        grnItemCalStatus,
      } = req.body;


      const itemGRNResult = new itemGRNModel({
        grnPartyRefNo,
        grnPartyId,
        grnPartyRefDate,
        grnPartyName,
        grnPartyCode,
        grnPartyAddress,
        grnNo,
        grnDate,
        grnCommonRemarks,
        grnPlant,
        grnDepartment,
        grnItemId,
        grnItemAddMasterName,
        grnItemType,
        grnItemIMTENo,
        grnItemRangeSize,
        grnItemRangeSizeUnit,
        grnItemMFRNo,
        grnItemLC,
        grnItemLCUnit,
        grnItemMake,
        grnItemModelNo,
        grnItemReceiptDate,
        grnItemDepartment,
        grnItemArea,
        grnItemPlaceOfUsage,
        grnItemCalFreInMonths,
        grnItemCalAlertDays,
        grnItemCalibrationSource,
        grnItemCalibrationDoneAt,
        grnItemCalibratedAt,
        grnItemOBType,
        grnItemStatus,
        grnAcCriteria,
        grnItemUncertainity,
        grnItemCalDate,
        grnItemDueDate,
        grnItemCertificateStatus,
        grnItemCertificateNo,
        grnItemCertificate,
        grnUncertainity,
        grnItemCalStatus,
      });
      const validationError = itemGRNResult.validateSync();

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

      const result = await itemGRNResult.save();

      if (Object.keys(result).length !== 0) {

        let itemCondition = ""
        if(grnItemCalStatus === "rejected"){
          itemCondition = "rejection"
        }else{
          itemCondition = "active"
        }

        const itemData = await itemAddModel.findById(grnItemId)
        const {
          _id,
          itemIMTENo,
          itemCurrentLocation: itemLastLocation,
          itemLocation: itemLastPlace,
          itemDepartment,
          itemCalDate: itemLastCalDate,
          itemDueDate: itemLastDueDate,
          dcStatus: lastDcStatus,
          dcNo: lastDcNo,
          dcId: lastDcId,
          dcCreatedOn: lastDcCreatedOn,
          itemPlant,
          itemAddMasterName,
          itemType,
          itemRangeSize,
          itemRangeSizeUnit,
          itemLC,
          itemLCUnit,
          itemModelNo,
          itemStatus,
          itemReceiptDate,
          itemCalFreInMonths,
          itemCalAlertDays,
          itemCalibrationSource,
          itemCalibrationDoneAt,
          itemCalibratedAt,
          
          
          itemOBType,
          itemUncertainity,
          itemUncertainityUnit,
          itemPrevCalData,
          itemCertificateNo : itemLastCertificateNo,


        } = itemData


        const updateItemFields = {
          itemIMTENo,
          itemLastPlace,
          itemCurrentLocation: itemDepartment,
          itemLastLocation,
          itemLocation: "department",
          itemLastCalDate,
          itemLastDueDate,
          itemStatus: itemCondition,
          itemLastStatus: itemStatus,
          itemCalDate: grnItemCalDate,
          itemDueDate: grnItemDueDate,
          grnId: result._id,
          grnStatus: "1",
          grnCreatedOn: grnDate,
          grnNo: grnNo,
          lastDcId,
          lastDcStatus,
          lastDcCreatedOn,
          lastDcNo,
          dcStatus: "0",
          dcNo: "",
          dcId: "",
          dcCreatedOn: "",
          itemCertificateNo: grnItemCertificateNo,
          itemLastCertificateNo,

        }
        const updateResult = await itemAddModel.findOneAndUpdate(
          { _id: grnItemId },
          { $set: updateItemFields },
          { new: true }
        );

        console.log(grnItemType)
        let obSize = [];

        if (grnAcCriteria.length > 0) {
          if (grnItemType === "variable") {
            obSize = grnAcCriteria.map(item => {
              return item.grnParameter + ":" + item.grnOBError
            })
          } else {
            obSize = grnAcCriteria.map(item => {

              if (grnItemOBType === "minmax") {
                return item.grnParameter + " : " + item.grnMinOB + "/" + item.grnMaxOB
              } else {
                return item.grnParameter + " : " + item.grnAverageOB
              }

            })
          }
        }




        const historyRecord = new itemHistory({
          itemIMTENo,
          itemGrnId: result._id,
          itemCurrentLocation: itemDepartment,
          itemLastLocation,
          itemLocation: "department",
          itemLastCalDate,
          itemLastDueDate,
          itemCalDate: grnItemCalDate,
          itemDueDate: grnItemDueDate,
          grnId: result._id,
          grnStatus: "1",
          grnCreatedOn: grnDate,
          grnNo: grnNo,
          lastDcId,
          lastDcStatus,
          lastDcCreatedOn,
          lastDcNo,
          dcStatus: "0",
          dcNo: "",
          dcId: "",
          dcCreatedOn: "",
          itemId: _id,
          itemCalId: "",
          itemAddMasterName,
          itemPlant,
          itemType,
          itemRangeSize,
          itemRangeSizeUnit,
          itemLC,
          itemLCUnit,
          itemModelNo,
          itemStatus : itemCondition,
          itemLastStatus: itemStatus,
          itemReceiptDate,
          itemDepartment,
          itemCalFreInMonths,
          itemCalAlertDays,
          itemCalibrationSource,
          itemCalStatus: grnItemCalStatus,
          itemCalibrationDoneAt,
          itemUncertainityUnit,
          itemPrevCalData,
          itemCalibratedAt,
          itemCertificateName: grnItemCertificate,
          itemOBType,
          itemUncertainity,
          itemLastCertificateNo,
          itemCertificateNo: grnItemCertificateNo
        });
        const itemHistoryData = await historyRecord.save();

        console.log(itemHistoryData, "Historysaved")
      }

      return res.status(200).json({ message: "Item GRN Data Successfully Saved", status: 1 });
    } catch (error) {

      session.endSession();
      console.log(error)

      if (error.errors) {
        const errors500 = {};
        for (const key in error.errors) {
          errors500[key] = error.errors[key].message;
        }
        return res.status(500).json({ error: errors500, status: 0 });
      }

      return res.status(500).json({ error: 'Internal server error on Item GRN', status: 0 });
    }
  },

  updateItemGRN: async (req, res) => {
    try {
      const itemGRNId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      //   return res.status(400).json({ error: 'Invalid desId value' });
      // }
      const { 
        
        grnPartyRefNo, 
        grnPartyId, 
        grnPartyRefDate, 
        grnPartyName, 
        grnPartyCode, 
        grnPartyAddress, 
        grnNo, 
        grnDate, 
        grnCommonRemarks, 
        grnPartyItems, 
        grnPlant, 
        grnDepartment,
        
        grnItemId,
        grnItemAddMasterName,
        grnItemType,
        grnItemIMTENo,
        grnItemRangeSize,
        grnItemRangeSizeUnit,
        grnItemMFRNo,
        grnItemLC,
        grnItemLCUnit,
        grnItemMake,
        grnItemModelNo,
        grnItemReceiptDate,
        grnItemDepartment,
        grnItemArea,
        grnItemPlaceOfUsage,
        grnItemCalFreInMonths,
        grnItemCalAlertDays,
        grnItemCalibrationSource,
        grnItemCalibrationDoneAt,
        grnItemCalibratedAt,
        grnItemOBType,
        grnItemStatus,
        grnAcCriteria,
        grnItemUncertainity,
        grnItemCalDate,
        grnItemDueDate,
        grnItemCertificateStatus,
        grnItemCertificateNo,
        grnItemCertificate,
        grnUncertainity,
        grnItemCalStatus
      } = req.body;

      // Create an object with the fields you want to update
      const updateItemGRNFields = {
        grnPartyRefNo,
        grnPartyId,
        grnPartyRefDate,
        grnPartyName,
        grnPartyCode,
        grnPartyAddress,
        grnNo,
        grnDate,
        grnCommonRemarks,
        grnPartyItems,
        grnPlant,
        grnDepartment,

        grnItemId,
        grnItemAddMasterName,
        grnItemType,
        grnItemIMTENo,
        grnItemRangeSize,
        grnItemRangeSizeUnit,
        grnItemMFRNo,
        grnItemLC,
        grnItemLCUnit,
        grnItemMake,
        grnItemModelNo,
        grnItemReceiptDate,
        grnItemDepartment,
        grnItemArea,
        grnItemPlaceOfUsage,
        grnItemCalFreInMonths,
        grnItemCalAlertDays,
        grnItemCalibrationSource,
        grnItemCalibrationDoneAt,
        grnItemCalibratedAt,
        grnItemOBType,
        grnItemStatus,
        grnAcCriteria,
        grnItemUncertainity,
        grnItemCalDate,
        grnItemDueDate,
        grnItemCertificateStatus,
        grnItemCertificateNo,
        grnItemCertificate,
        grnUncertainity,
        grnItemCalStatus
      };

      
     
     
      // Find the designation by desId and update it
      const itemGRNUpdate = new itemGRNModel(updateItemGRNFields);

      const validationError = itemGRNUpdate.validateSync();
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
      const updateItemGRN = await itemGRNModel.findOneAndUpdate(
        { _id: itemGRNId },
        updateItemGRNFields,
        { new: true } // To return the updated document
      );

      if (Object.keys(updateItemGRN).length !== 0) {

        let itemCondition = ""
        if(grnItemCalStatus === "rejected"){
          itemCondition = "rejection"
        }else{
          itemCondition = "active"
        }

        const itemData = await itemAddModel.findById(grnItemId)
        const {
          _id,
          itemIMTENo,
          itemCurrentLocation: itemLastLocation,
          itemLocation: itemLastPlace,
          itemDepartment,
          itemCalDate: itemLastCalDate,
          itemDueDate: itemLastDueDate,
          dcStatus: lastDcStatus,
          dcNo: lastDcNo,
          dcId: lastDcId,
          dcCreatedOn: lastDcCreatedOn,
          itemPlant,
          itemAddMasterName,
          itemType,
          itemRangeSize,
          itemRangeSizeUnit,
          itemLC,
          itemLCUnit,
          itemModelNo,
          itemStatus,
          itemReceiptDate,
          itemCalFreInMonths,
          itemCalAlertDays,
          itemCalibrationSource,
          itemCalibrationDoneAt,
          itemCalibratedAt,
          itemCertificateName,
          itemCertificateNo,
          itemOBType,
          itemUncertainity,
          itemUncertainityUnit,
          itemPrevCalData,


        } = itemData


        const updateItemFields = {
          itemIMTENo,
          itemLastPlace,
          itemCurrentLocation: itemDepartment,
          itemLastLocation,
          itemLocation: "department",
          itemLastCalDate,
          itemLastDueDate,
          itemStatus: itemCondition,
          itemLastStatus: itemStatus,
          itemCalDate: grnItemCalDate,
          itemDueDate: grnItemDueDate,
          grnId: updateItemGRN._id,
          grnStatus: "1",
          grnCreatedOn: grnDate,
          grnNo: grnNo,
          lastDcId,
          lastDcStatus,
          lastDcCreatedOn,
          lastDcNo,
          dcStatus: "0",
          dcNo: "",
          dcId: "",
          dcCreatedOn: ""
        }
        const updateResult = await itemAddModel.findOneAndUpdate(
          { _id: grnItemId },
          { $set: updateItemFields },
          { new: true }
        );

        let obSize = [];
        if (grnAcCriteria.length > 0) {
          if (grnItemType === "variable") {
            obSize = grnAcCriteria.map(item => {
              return item.grnParameter + ":" + item.grnOBError
            })
          } else {
            obSize = grnAcCriteria.map(item => {

              if (grnItemOBType === "minmax") {
                return item.grnParameter + " : " + item.grnMinOB + "/" + item.grnMaxOB
              } else {
                return item.grnParameter + " : " + item.grnAverageOB
              }

            })
          }
        }


        const historyRecord = {
          itemIMTENo,
          itemGrnId: updateItemGRN._id,
          itemCurrentLocation: itemDepartment,
          itemLastLocation,
          itemLocation: "department",
          itemLastCalDate,
          itemLastDueDate,
          itemCalDate: grnItemCalDate,
          itemDueDate: grnItemDueDate,
          grnId: updateItemGRN._id,
          grnStatus: "1",
          grnCreatedOn: grnDate,
          grnNo: grnNo,
          lastDcId,
          lastDcStatus,
          lastDcCreatedOn,
          lastDcNo,
          dcStatus: "0",
          dcNo: "",
          dcId: "",
          dcCreatedOn: "",
          itemId: _id,
          itemCalId: "",
          itemAddMasterName,
          itemPlant,
          itemType,
          itemRangeSize,
          itemRangeSizeUnit,
          itemLC,
          itemLCUnit,
          itemModelNo,
          itemStatus : itemCondition,
          itemLastStatus: itemStatus,
          itemReceiptDate,
          itemDepartment,
          itemCalFreInMonths,
          itemCalAlertDays,
          itemCalibrationSource,
          itemCalibrationDoneAt,
          itemUncertainityUnit,
          itemPrevCalData,
          itemCalibratedAt,
          itemCertificateName: grnItemCertificate,
          itemCertificateNo,
          itemOBType,
          itemUncertainity
        };
        const itemHistoryData = await itemHistory.findOneAndUpdate(
          { itemGrnId: itemGRNId },
          { $set: historyRecord },
          { new: true }
        );

        console.log(itemHistoryData, "History Updated")
      }


      if (!updateItemGRN) {
        return res.status(404).json({ error: 'Item GRN not found' });
      }
      console.log("Item GRN Updated Successfully")
      res.status(200).json({ result: updateItemGRN, message: "Item GRN Updated Successfully" });
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
  deleteItemGRN: async (req, res) => {
    try {

      const { itemGRNIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = [];

      for (const itemGRNId of itemGRNIds) {
        // Find and remove each vendor by _id
        const grnItem = await itemGRNModel.findById(itemGRNId)

        if (Object.keys(grnItem).length !== 0) {

          const itemData = await itemAddModel.findById(grnItem.grnItemId)
          const {
            lastDcStatus,
            lastDcNo,
            lastDcId,
            itemLastDueDate,
            itemLastCalDate,
            itemLastLocation,
            itemLastPlace,
           
            itemCertificateNo: itemLastCertificateNo,
            itemLastCertificateNo: itemCertificateNo,
            itemStatus,
            itemLastStatus,

          } = itemData

          const updateItemFields = {
            dcStatus: lastDcStatus,
            dcNo: lastDcNo,
            dcId: lastDcId,
            dcCreatedOn: lastDcCreatedOn,
            itemLocation: itemLastPlace,
            itemCurrentLocation: itemLastLocation,
            itemCalDate: itemLastCalDate,
            itemDueDate: itemLastDueDate,
            itemStatus: itemLastStatus,
            itemLastStatus: itemStatus,
            grnId: "",
            grnStatus: "0",
            grnCreatedOn: "",
            grnNo: "",
            itemLastCertificateNo,
            itemCertificateNo
          }


          const updateResult = await itemAddModel.findOneAndUpdate(
            { _id: grnItem.grnItemId },
            { $set: updateItemFields },
            { new: true }
          );

          const itemHistoryRemove = await itemHistory.findOneAndRemove({ itemGrnId: itemGRNId })
        }

        const deletedItemGRN = await itemGRNModel.findOneAndRemove({ _id: itemGRNId });
        console.log(deletedItemGRN)
        if (!deletedItemGRN) {
          console.log(`Item GRN with ID ${itemGRNId} not found.`);
          res.status(500).json({ message: `Item GRN with ID not found.` });
        } else {
          console.log(`Item GRN with ID ${itemGRNId} deleted successfully.`);
          deleteResults.push(deletedItemGRN);
        }
      }

      return res.status(202).json({ message: 'Item GRN deleted successfully', results: `${deleteResults.length} Item GRN Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getItemGRNById: async (req, res) => {
    try {
      const itemGRNId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getItemGRNById = await itemGRNModel.findOne(
        { _id: itemGRNId }// To return the updated document
      );

      if (!getItemGRNById) {
        return res.status(404).json({ error: 'Item GRN not found' });
      }
      console.log("Item GRN Get Successfully")
      res.status(200).json({ result: getItemGRNById, message: "ITem GRN get Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
    }
  }

}


module.exports = itemGRNController;