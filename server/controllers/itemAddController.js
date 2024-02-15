const itemAddModel = require("../models/itemAddModel")
const dayjs = require('dayjs')
const excelToJson = require('convert-excel-to-json');
const itemHistory = require("../models/itemHistory");
const itemCalModel = require("../models/itemCalModel");
const itemDcModel = require("../models/itemDcModel")

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

  getItemByPlant: async (req, res) => {
    const {allowedPlants} = req.body
    try {
      const itemAddResult = await itemAddModel.aggregate([
        {
          $match: {
            "itemPlant": { $in: allowedPlants ? allowedPlants : [] } // Specify the values to match
          }
        }
      ])
     
      res.status(202).json({ result: itemAddResult, status: 1 });
      //res.status(200).json(employees);

    } catch (err) {
      console.error(err);
      res.status(500).send('Error on ItemAddByPlant');
    }
  },
  createItemAdd: async (req, res) => {
    try {
      const {
        itemMasterRef,
        selectedItemMaster,
        isItemMaster,
        itemPlant,
        itemAddMasterName,
        itemIMTENo,
        itemSAPNo,
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
        itemStatusReason,
        itemReceiptDate,
        itemDepartment,
        itemCurrentLocation,
        itemLastLocation,
        itemArea,
        itemPlaceOfUsage,
        itemCalFreInMonths,
        itemCalAlertDays,
        itemCalibrationSource,
        itemCalibrationDoneAt,
        itemItemMasterName,
        itemItemMasterIMTENo,
        itemSupplier,
        itemOEM,
        itemCalDate,
        itemDueDate,
        itemCalibratedAt,
        itemCertificateName,
        itemCertificateNo,
        itemUncertainity,
        itemUncertainityUnit,
        itemPrevCalData,
        itemPartName,
        itemOBType,
        dcId,
        dcStatus,
        dcCreatedOn,
        grnId,
        grnStatus,
        grnCreatedOn,
        acceptanceCriteria,
        acMinOB,
        acMaxOB,
        acAverageOB,
        acOBError,
        acMinPSError,
        acMaxPSError,
        itemCreatedBy,
        itemLastModifiedBy,
        calibrationCost,
        gaugeUsage,
        lifealertDays,
        purchaseRefNo,
        purchaseDate,
        purchaseCost,
        specialRemark,
        drawingIssueNo,
        drawingNo,
        rdName,
        msaName,
        otherFile,

        // Assuming createdAt is part of the request body
      } = req.body;




      const newItemFields = {
        itemMasterRef,
        selectedItemMaster,
        itemPlant,
        isItemMaster,
        itemAddMasterName,
        itemIMTENo,
        itemSAPNo,
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
        itemStatusReason,
        itemReceiptDate,
        itemDepartment,
        itemCurrentLocation,
        itemLastLocation,
        itemLocation: "department",
        itemArea,
        itemPlaceOfUsage,
        itemCalFreInMonths,
        itemCalAlertDays,
        itemCalibrationSource,
        itemCalibrationDoneAt,
        itemItemMasterName,
        itemItemMasterIMTENo,
        itemSupplier,
        itemOEM,
        itemCalDate,
        itemDueDate,
        itemCalibratedAt,
        itemCertificateName,
        itemCertificateNo,
        itemPartName,
        itemOBType,
        itemUncertainity,
        itemUncertainityUnit,
        itemPrevCalData,
        dcId,
        dcStatus,
        dcCreatedOn,
        grnId,
        grnStatus,
        grnCreatedOn,
        acceptanceCriteria,
        acMinOB,
        acMaxOB,
        acAverageOB,
        acOBError,
        acMinPSError,
        acMaxPSError,
        itemCreatedBy,
        itemLastModifiedBy,
        calibrationCost,
        gaugeUsage,
        lifealertDays,
        purchaseRefNo,
        purchaseDate,
        purchaseCost,
        specialRemark,
        drawingIssueNo,
        drawingNo,
        rdName,
        msaName,
        otherFile,

      };

      const newItem = new itemAddModel(newItemFields);
      console.log("SAPNo", itemSAPNo)
      console.log(newItemFields)

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
        itemId: createdItem._id,
        selectedItemMaster,
        itemPlant,
        isItemMaster,
        itemAddMasterName,

        itemIMTENo,
        itemSAPNo,
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
        itemCalDate,
        itemDueDate,
        itemCalibratedAt,
        itemCertificateName,
        itemCertificateNo,
        itemOBType,
        itemUncertainity,
        itemUncertainityUnit,
        itemPrevCalData,
        acceptanceCriteria: obSize,
        itemCreatedBy,
        itemLastModifiedBy,
        rdName,
        msaName,
        otherFile,

      });
      await historyRecord.save();
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
        selectedItemMaster,
        isItemMaster,
        itemAddMasterName,
        itemIMTENo,
        itemSAPNo,
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
        itemPlant,

        itemLastLocation,
        itemArea,
        itemPlaceOfUsage,
        itemCalFreInMonths,
        itemCalAlertDays,
        itemCalibrationSource,
        itemCalibrationDoneAt,
        itemItemMasterName,
        itemItemMasterIMTENo,
        itemSupplier,
        itemOEM,
        itemCalDate,
        itemDueDate,
        itemCalibratedAt,
        itemCertificateName,
        itemCertificateNo,
        itemPartName,
        itemOBType,
        itemUncertainity,
        itemUncertainityUnit,
        itemPrevCalData,
        dcId,
        dcStatus,
        dcCreatedOn,
        grnId,
        grnStatus,
        grnCreatedOn,
        acceptanceCriteria,
        acMinOB,
        acMaxOB,
        acAverageOB,
        acOBError,
        acMinPSError,
        acMaxPSError,
        itemCreatedBy,
        itemLastModifiedBy,

        calibrationCost,
        gaugeUsage,
        lifealertDays,
        purchaseRefNo,
        purchaseDate,
        purchaseCost,
        specialRemark,
        drawingIssueNo,
        drawingNo,
        rdName,
        msaName,
        otherFile,
      } = req.body;
      // Create an object with the fields you want to update
      const updateItemFields = {
        itemMasterRef,
        selectedItemMaster,
        isItemMaster,
        itemAddMasterName,
        itemIMTENo,
        itemSAPNo,
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
        itemPlant,

        itemLastLocation,
        itemArea,
        itemPlaceOfUsage,
        itemCalFreInMonths,
        itemCalAlertDays,
        itemCalibrationSource,
        itemCalibrationDoneAt,
        itemItemMasterName,
        itemItemMasterIMTENo,
        itemSupplier,
        itemOEM,
        itemCalDate,
        itemUncertainity,
        itemUncertainityUnit,
        itemPrevCalData,
        itemDueDate,
        itemCalibratedAt,
        itemCertificateName,
        itemCertificateNo,
        itemPartName,
        itemOBType,
        dcId,
        dcStatus,
        dcCreatedOn,
        grnId,
        grnStatus,
        grnCreatedOn,
        acceptanceCriteria,
        acMinOB,
        acMaxOB,
        acAverageOB,
        acOBError,
        acMinPSError,
        acMaxPSError,
        itemCreatedBy,
        itemLastModifiedBy,

        calibrationCost,
        gaugeUsage,
        lifealertDays,
        purchaseRefNo,
        purchaseDate,
        purchaseCost,
        specialRemark,
        drawingIssueNo,
        drawingNo,
        rdName,
        msaName,
        otherFile,
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
        { new: true }// To return the updated document
      );

      if (!updateItemAdd) {
        return res.status(404).json({ error: 'ItemAdd not found' });
      } else {
        let obSize = [];
        if (updateItemAdd.itemType === "variable") {
          obSize = acceptanceCriteria.map(item => {
            return item.acParameter + ":" + (item.acOBError ? item.acOBError : "")
          })
        } else {
          obSize = acceptanceCriteria.map(item => {

            if (itemOBType === "minmax") {
              return item.acParameter + ":" + (item.acMinOB ? item.acMinOB : "") + "/" + (item.acMaxOB ? item.acMaxOB : "")
            } else {
              return item.acParameter + ":" + (item.acAverageOB ? item.acAverageOB : "")
            }

          })
        }
        console.log(obSize)

        console.log("history working")

        const historyRecord = {
          itemId: updateItemAdd._id,
          selectedItemMaster,
          itemPlant,
          isItemMaster,
          itemAddMasterName,
          itemIMTENo,
          itemSAPNo,
          itemType,
          itemRangeSize,
          itemRangeSizeUnit,
          itemLC,
          itemLCUnit,
          itemModelNo,
          itemStatus,
          itemReceiptDate,
          itemDepartment,
          itemCurrentLocation: updateItemAdd.itemCurrentLocation,
          itemLastLocation,
          itemLocation: "department",
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
          acceptanceCriteria: obSize,
          itemCreatedBy,
          itemLastModifiedBy,
          rdName,
          msaName,
          otherFile,

        };
        
        const updateItemHistory = await itemHistory.findOneAndUpdate(
          { itemId: updateItemAdd._id },
          {$set: historyRecord},

        );
        console.log(updateItemHistory)
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
      const { itemAddIds } = req.body; // Assuming an array of itemAdd IDs is sent in the request body

      const deleteResults = [];
      const errors = [];

      for (const itemAddId of itemAddIds) {
        // Check if the itemAddId is used in itemCalModel
        const calData = await itemCalModel.findOne({ calItemId: itemAddId });
        const itemData = await itemAddModel.findOne({ _id: itemAddId });

        if (calData || (itemData && itemData.dcStatus === "1")) {
          // If the itemAddId is used in itemCalModel or if its dcStatus is "1", push an error message
          errors.push(`Items are is already used cannot be deleted.`);
        } else {
          // If the itemAddId is not used in itemCalModel and its dcStatus is not "1", proceed with deletion
          const deletedItemAdd = await itemAddModel.findOneAndRemove({ _id: itemAddId });
          const deleteHistoryCard = await itemHistory.deleteMany({ itemIMTENo: itemData.itemIMTENo });
          if (!deletedItemAdd) {
            errors.push(`Selected ItemAdd with ID ${itemAddId} not found.`);
          } else {
            deleteResults.push(deletedItemAdd);
          }
        }
      }

      if (errors.length > 0) {
        // If there are errors, send 400 Bad Request status with error messages
        if (errors.length === 1) {
          return res.status(400).json({ errors: "Selected Item already used cannot be deleted" });
        } else {
          return res.status(400).json({ errors: "Selected Items are already used cannot be deleted" });
        }

      }

      return res.status(202).json({ message: 'ItemAdd deleted successfully', results: `${deleteResults.length} ItemAdd Deleted Successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  updateItemStatus: async (req, res) => {
    try {
      const {itemIds, itemStatus, itemStatusReason} = req.body; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      console.log(req.body)
      const changeStatus = [];
      if(itemIds.length > 0){
        for(const itemId of itemIds){
          const updateItemAdd = await itemAddModel.findOneAndUpdate(
            { _id : itemId },
            {$set : {itemStatus, itemStatusReason}},
            { new: true }
          );
          changeStatus.push(updateItemAdd)
        }
      }
      res.status(200).json({ message: `Status changed for ${changeStatus.length} items`, status: "1" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
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
  getAllDistinctItemName: async (req, res) => {
    try {
      const itemAddResult = await itemAddModel.find().distinct('itemAddMasterName');
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

      const { itemIds, itemCurrentLocation } = req.body

      const updatePromises = itemIds.map(async (itemId) => {

        const itemData = await itemAddModel.findById(itemId)
        const { itemCurrentLocation: itemLastLocation, itemIMTENo } = itemData
        const updateItemFields = { itemIMTENo, itemCurrentLocation, itemLastLocation, itemLocation: "department" }
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
  uploadItemAddExcelData: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const excelData = req.file.buffer; // Access the file buffer

      // Convert Excel data to JSON
      const jsonData = excelToJson({
        source: excelData,
        header: {
          rows: 1 // Assuming the first row contains headers
        }
      });

      const uploadPromises = jsonData.Sheet1.map(async (item) => {
        try {
          // Create an instance of itemAddModel and save it to the database
          const newItem = new itemAddModel(item); // Assuming 'item' conforms to your itemAddModel schema
          const savedItem = await newItem.save();
          return savedItem;
        } catch (error) {
          console.error('Error saving item:', error);
          return null;
        }
      });

      // Execute all upload promises
      const uploadedItems = await Promise.all(uploadPromises);

      res.status(200).json({ uploadedItems, message: 'Excel data uploaded successfully' });
    } catch (error) {
      console.error('Error uploading Excel data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getItemAddByPlant: async (req, res) => {
    try {
      // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      console.log(req.body)

      // const employeesToRemove = await itemAddModel.find({ _id: { $in: plantEmployees } });
      // const getItemAddById = await itemAddModel.findOne(
      //   { _id: itemAddId }// To return the updated document
      // );

      // if (!getItemAddById) {
      //   return res.status(404).json({ error: 'Item Add not found' });
      // }
      console.log("Item Master Get Successfully")
      res.status(200).json({ result: "success", message: "Item Master get Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
    }
  },
  uploadItemAddInExcel: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const excelData = req.file.buffer; // Access the file buffer

      // Convert Excel data to JSON
      const jsonData = excelToJson({
        source: excelData,
        header: {
          // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
          rows: 1 // 2, 3, 4, etc.
        },
        columnToKey: {
          A: 'itemMasterRef',
          B: 'itemAddMasterName',
          C: 'itemIMTENo',
          D: 'itemSAPNo',
          E: 'itemType',
          F: 'itemRangeSize',
          G: 'itemRangeSizeUnit',
          H: 'itemMFRNo',
          I: 'itemLC',
          J: 'itemLCUnit',
          K: 'itemMake',
          L: 'itemModelNo',
          M: 'itemStatus',
          N: 'itemReceiptDate',
          O: 'itemDepartment',
          P: 'itemCurrentLocation',
          Q: 'itemLocation',
          R: 'itemLastLocation',
          S: 'itemArea',
          T: 'itemPlaceOfUsage',
          U: 'itemCalFreInMonths',
          V: 'itemCalAlertDays',
          W: 'itemCalibrationSource',
          X: 'itemSupplier',
          Y: 'itemPartName',
          Z: 'itemCalDate',
          AA: 'itemDueDate',
          AB: 'itemCalibratedAt',
          AC: 'itemCertificateNo',
          AD: 'itemCalibrationDoneAt',
          AE: 'itemUncertainity',
          AF: 'itemUncertainityUnit',
          AG: 'itemPlant',
          AH: 'itemPrevCalData',
          AI: 'itemItemMasterIMTENo',


        }
      });
      console.log(jsonData)

      const modifiedData = jsonData.Sheet1.map(item => {
        item.itemCalDate = dayjs(item.itemCalDate).format("YYYY-MM-DD")
        item.itemDueDate = dayjs(item.itemDueDate).format("YYYY-MM-DD")
        item.itemReceiptDate = dayjs(item.itemReceiptDate).format("YYYY-MM-DD")
        item.itemLocation = item.itemLocation ? (item.itemLocation).toLowerCase() : "department"
        item.itemStatus = item.itemStatus ? (item.itemStatus).toLowerCase() : "active"
        item.itemItemMasterIMTENo = item.itemItemMasterIMTENo ? item.itemItemMasterIMTENo.split(",") : []
        item.itemPartName = item.itemPartName ? item.itemPartName.split(",") : []

        return item;
      });



      const uploadPromises = modifiedData.map(async (item) => {
        try {
          // Create an instance of designationModel and save it to the database
          const newItemAdd = new itemAddModel(item); // Assuming 'item' conforms to your ItemAddModel schema
          const savedItemAdd = await newItemAdd.save();
          console.log(savedItemAdd)

          const data = {
            itemCalDate: savedItemAdd.itemCalDate ? dayjs(savedItemAdd.itemCalDate).format("YYYY-MM-DD") : "",
            itemDueDate: savedItemAdd.itemDueDate ? dayjs(savedItemAdd.itemDueDate).format("YYYY-MM-DD") : "",
            itemIMTENo: savedItemAdd.itemIMTENo ? savedItemAdd.itemIMTENo : "",
            itemCalibratedAt: savedItemAdd.itemCalibratedAt ? savedItemAdd.itemCalibratedAt : "",
            itemCertificateNo: savedItemAdd.itemCertificateNo ? savedItemAdd.itemCertificateNo : "",
            itemId: savedItemAdd._id

          }
          console.log(data)
          const historyObj = new itemHistory(data);
          const savedHistoryCard = await historyObj.save();

          return savedItemAdd;

        } catch (error) {
          console.error('Error saving ItemAdd:', error);
          // return res.status(500).json({ error: 'Internal Server Error' });
        }
      });

      // Execute all upload promises
      const uploadedItemAdds = await Promise.all(uploadPromises);

      res.status(200).json({ uploadedItemAdds, message: 'Uploaded successfully' });
    } catch (error) {
      console.error('Error uploading Excel data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }





}


module.exports = itemAddController;