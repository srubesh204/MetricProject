const itemGRNModel = require("../models/itemGRNModel")
const itemAddModel = require('../models/itemAddModel')

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
      const { grnPartyRefNo, grnPartyId, grnPartyRefDate, grnPartyName, grnPartyCode, grnPartyAddress, grnNo, grnDate, grnCommonRemarks, grnPartyItems, grnPlant, grnDepartment } = req.body;
      const itemGRNResult = new itemGRNModel({ grnPartyRefNo, grnPartyId, grnPartyRefDate, grnPartyName, grnPartyCode, grnPartyAddress, grnNo, grnDate, grnCommonRemarks, grnPartyItems, grnPlant, grnDepartment });
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

        const updatePromises = grnPartyItems.map(async (item) => {

          const itemData = await itemAddModel.findById(item.grnItemId)
          const {
            itemIMTENo,
            itemCurrentLocation: itemLastLocation,
            itemDepartment,
            itemCalDate: itemLastCalDate,
            itemDueDate: itemLastDueDate,
            dcStatus: lastDcStatus,
            dcNo: lastDcNo,
            dcId: lastDcId,
            dcCreatedOn: lastDcCreatedOn
          } = itemData
          const updateItemFields = {
            itemIMTENo,
            itemCurrentLocation: itemDepartment,
            itemLastLocation,
            itemLocation ,
            itemLastCalDate, itemLastDueDate,
            itemCalDate: item.grnItemCalDate,
            itemDueDate: item.grnItemDueDate,
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
            dcCreatedOn: ""
          }
          const updateResult = await itemAddModel.findOneAndUpdate(
            { _id: item._id },
            { $set: updateItemFields },
            { new: true }
          );
          console.log("itemUpdated")
          return updateResult;
        });
        const updatedItems = await Promise.all(updatePromises);
      }

      return res.status(200).json({ message: "Item GRN Data Successfully Saved", status: 1 });
    } catch (error) {
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
      const { grnPartyRefNo, grnPartyId, grnPartyRefDate, grnPartyName, grnPartyCode, grnPartyAddress, grnNo, grnDate, grnCommonRemarks, grnPartyItems, grnPlant, grnDepartment } = req.body;

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
        grnDepartment
      };

      const prevItemGrn = await itemGRNModel.findById(itemGRNId)
      const { grnPartItems: prevPartyItems } = prevItemGrn
      const prevUpdatePromises = prevPartyItems.map(async (item) => {

        const itemData = await itemAddModel.findById(item._id)
        const {
          itemIMTENo,
          itemLastLocation,
          itemLastCalDate: itemCalDate,
          itemLastDueDate: itemDueDate,
          lastDcNo,
          lastDcId,
          lastDcCreatedOn

        } = itemData
        const updateItemFields = {
          itemIMTENo,
          itemCurrentLocation: itemLastLocation,
          itemLocation: "department",
          itemCalDate,
          itemDueDate,
          dcId: lastDcId,
          dcStatus: "1",
          dcCreatedOn: lastDcCreatedOn,
          dcNo: lastDcNo
        }
        const updateResult = await itemAddModel.findOneAndUpdate(
          { _id: item._id },
          { $set: updateItemFields },
          { new: true }
        );
        console.log(updateResult)
        return updateResult;
      });
      const prevUpdatedValues = await Promise.all(prevUpdatePromises);

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

        const updatePromises = grnPartyItems.map(async (item) => {

          const itemData = await itemAddModel.findById(item.grnItemId)
          const { } = itemData
          const updateItemFields = {
            itemCalDate: item.grnItemCalDate,
            itemDueDate: item.grnItemDueDate,
            itemCertificateName: item.grnItemCertificate,
            itemCertificateNo: item.grnItemCertificateNo,
            grnStatus: "1",
            grnId: itemGRNId,
            grnCreatedOn: grnDate,
            grnNo: grnNo
          }
          const updateResult = await itemAddModel.findOneAndUpdate(
            { _id: item._id },
            { $set: updateItemFields },
            { new: true }
          );
          console.log("grnUpdated")
          return updateResult;
        });
        const updatedItems = await Promise.all(updatePromises);
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
        const deletedItemGRN = await itemGRNModel.findOneAndRemove({ _id: itemGRNId });
        console.log(deletedItemGRN)
        if (!deletedItemGRN) {
          // If a vendor was not found, you can skip it or handle the error as needed.
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