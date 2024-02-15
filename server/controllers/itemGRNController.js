const itemGRNModel = require("../models/itemGRNModel")
const itemAddModel = require('../models/itemAddModel');
const itemHistory = require("../models/itemHistory");
const { compDetailsSchema } = require("../models/compDetailsModel");
const { plantSchema } = require("../models/compDetailsModel");
const formatNoModel = require("../models/formatNoModel");
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs')
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
        grnItemDcNo,
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
        isOnSiteGRN
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
        grnItemDcNo,
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
        isOnSiteGRN
      });

      const getCompDetailsById = await compDetailsSchema.findOne(
        { compId: 1 } // To return the updated document
      );
      const getPlantAddress = await plantSchema.findOne(
        { plantName: grnPlant } // To return the updated document
      );

      const formatNo = await formatNoModel.findOne({ formatId: 1 });

      const formatNumber = `${formatNo.fGrn ? (formatNo.fGrn.frNo + " " + formatNo.fGrn.amNo + " " + formatNo.fGrn.amDate) : ""}`
      console.log(formatNumber)

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
        if (grnItemCalStatus === "rejected") {
          itemCondition = "rejection"
        } else {
          itemCondition = "active"
        }

        const itemData = await itemAddModel.findById(grnItemId)
        const {
          _id,
          itemIMTENo,
          itemCurrentLocation: itemLastLocation,
          itemCurrentLocation,
          itemLocation: itemLastPlace,
          itemDepartment,
          itemCalDate: itemLastCalDate,
          itemDueDate: itemLastDueDate,
          itemCalDate,
          itemDueDate,
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
          itemCertificateNo: itemLastCertificateNo,
        } = itemData


        const updateItemFields = {
          itemIMTENo,
          itemLastPlace : isOnSiteGRN ==="yes" ? "" : itemLastPlace,
          itemCurrentLocation: isOnSiteGRN ==="yes" ? itemCurrentLocation : itemDepartment,
          itemLastLocation: isOnSiteGRN ==="yes" ? "" : itemLastLocation,
          itemLocation: "department",
          itemLastCalDate : grnItemStatus === "Calibrated" ? itemLastCalDate : itemCalDate,
          itemLastDueDate : grnItemStatus === "Calibrated" ? itemLastDueDate : itemDueDate,
          itemStatus: itemCondition,
          itemLastStatus: itemStatus,
          itemCalDate: grnItemStatus === "Calibrated" ? grnItemCalDate : itemLastCalDate,
          itemDueDate: grnItemStatus === "Calibrated" ? grnItemDueDate : itemLastDueDate,
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

        console.log(grnAcCriteria)
        let obSize = [];

        if (grnAcCriteria.length > 0) {

          console.log(grnItemType)
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
          itemLastCalDate : grnItemStatus === "Calibrated" ? itemLastCalDate : itemCalDate,
          itemLastDueDate : grnItemStatus === "Calibrated" ? itemLastDueDate : itemDueDate,
          itemCalDate: grnItemStatus === "Calibrated" ? grnItemCalDate : itemLastCalDate,
          itemDueDate: grnItemStatus === "Calibrated" ? grnItemDueDate : itemLastDueDate,
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
          itemStatus: itemCondition,
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
          itemCalibratedAt : grnPartyName,
          itemCertificateName: grnItemCertificate,
          itemOBType,
          itemUncertainity,
          itemLastCertificateNo,
          itemCertificateNo: grnItemCertificateNo,
          acceptanceCriteria: obSize
        });
        const itemHistoryData = await historyRecord.save();

        console.log(itemHistoryData, "Historysaved")

        let tableRow = `
        <tr>
            <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="text-center align-middle">1</td>
            <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="align-middle">Item Name: ${grnItemAddMasterName ? grnItemAddMasterName : "-"} IMTE No: ${grnItemIMTENo ? grnItemIMTENo : "-"}<br>
            Range/Size: ${grnItemRangeSize ? grnItemRangeSize : "" + ' ' + grnItemRangeSizeUnit ? grnItemRangeSizeUnit : ""} L.C.: ${(grnItemLC ? grnItemLC : "") + '' + (grnItemLCUnit ? grnItemLCUnit : '')}<br>
            Make: ${grnItemMake ? grnItemMake : "-"} Sr.No: ${grnItemMFRNo ? grnItemMFRNo : "-"} Cal. Frequency: ${grnItemCalFreInMonths ? grnItemCalFreInMonths : "-"} months</td>
            <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="text-center align-middle">${grnItemDcNo}</td>
            <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="text-center align-middle">${grnItemStatus}</td>
        </tr>
    `;



        // Example usage:

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Read the HTML template file
        const filePath = path.resolve(__dirname, '../../server/templates/grnTemplate.html');
        const htmlTemplate = fs.readFileSync(filePath, 'utf8');

        // Replace placeholders with actual data
        const modifiedHTML = htmlTemplate

          .replace(/{{dcPartyItems}}/g, tableRow ? tableRow : "")
          .replace(/{{Company Name}}/g, getCompDetailsById.companyName ? getCompDetailsById.companyName : "")
          .replace(/{{Plant}}/g, getPlantAddress.plantName ? getPlantAddress.plantName : "")
          .replace(/{{PlantAddress}}/g, getPlantAddress.plantAddress ? getPlantAddress.plantAddress : "")
          .replace(/{{dcPartyName}}/g, grnPartyName ? grnPartyName : "")
          .replace(/{{dcPartyAddress}}/g, grnPartyAddress ? grnPartyAddress : "")
          .replace(/{{dcNo}}/g, grnNo ? grnNo : "")
          .replace(/{{partyDcNo}}/g, grnItemDcNo ? grnItemDcNo : "")
          .replace(/{{partyRefNo}}/g, grnPartyRefNo ? grnPartyRefNo : "")
          .replace(/{{partyRefDate}}/g, grnPartyRefDate ? dayjs(grnPartyRefDate).format('DD-MM-YYYY') : "")
          .replace(/{{dcDate}}/g, grnDate ? dayjs(grnDate).format('DD-MM-YYYY') : "")
          .replace(/{{dcCR}}/g, grnCommonRemarks ? grnCommonRemarks : "")
          .replace(/{{logo}}/g, process.env.SERVER_PORT + '/logo/' + getCompDetailsById.companyLogo)
          .replace(/{{formatNo}}/g, formatNumber ? formatNumber : "")


        // Add more replace statements for additional placeholders as needed

        // Set the modified HTML content

        console.log(modifiedHTML)
        await page.setContent(modifiedHTML, { waitUntil: 'networkidle0' });

        // Generate PDF
        await page.pdf({ path: `./storage/grnCertificates/${grnNo}.pdf`, format: 'A4' });

        await browser.close();

        console.log('PDF created successfully');
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
        grnItemDcNo,
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
        isOnSiteGRN
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
        grnItemDcNo,
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
        isOnSiteGRN
      };


      const getCompDetailsById = await compDetailsSchema.findOne(
        { compId: 1 } // To return the updated document
      );
      const getPlantAddress = await plantSchema.findOne(
        { plantName: grnPlant } // To return the updated document
      );

      const formatNo = await formatNoModel.findOne({ formatId: 1 });

      const formatNumber = `${formatNo.fGrn ? (formatNo.fGrn.frNo + " " + formatNo.fGrn.amNo + " " + formatNo.fGrn.amDate) : ""}`
      console.log(formatNumber)



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
        if (grnItemCalStatus === "rejected") {
          itemCondition = "rejection"
        } else {
          itemCondition = "active"
        }

        const itemData = await itemAddModel.findById(grnItemId)
        const {
          _id,
          itemIMTENo,
          itemCurrentLocation: itemLastLocation,
          itemCurrentLocation,
          itemLocation: itemLastPlace,
          itemDepartment,
          itemCalDate: itemLastCalDate,
          itemDueDate: itemLastDueDate,
          itemCalDate,
          itemDueDate,
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

        console.log(isOnSiteGRN)
        const updateItemFields = {
          itemIMTENo,
          itemLastPlace: updateItemGRN.isOnSiteGRN ==="yes" ? "" : itemLastPlace,
          itemCurrentLocation: updateItemGRN.isOnSiteGRN ==="yes" ? itemCurrentLocation : itemDepartment,
          itemLastLocation : updateItemGRN.isOnSiteGRN ==="yes" ? "" : itemLastLocation,
          itemLocation: "department",
          itemLastCalDate : grnItemStatus === "Calibrated" ? itemLastCalDate : itemCalDate,
          itemLastDueDate : grnItemStatus === "Calibrated" ? itemLastDueDate : itemDueDate,
          itemCalDate: grnItemStatus === "Calibrated" ? grnItemCalDate : itemLastCalDate,
          itemDueDate: grnItemStatus === "Calibrated" ? grnItemDueDate : itemLastDueDate,
          itemStatus: itemCondition,
          itemLastStatus: itemStatus,
          
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
          itemStatus: itemCondition,
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

        let tableRow = `
        <tr>
            <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="text-center align-middle">1</td>
            <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="align-middle">Item Name: ${grnItemAddMasterName ? grnItemAddMasterName : "-"} IMTE No: ${grnItemIMTENo ? grnItemIMTENo : "-"}<br>
            Range/Size: ${grnItemRangeSize ? grnItemRangeSize : "" + ' ' + grnItemRangeSizeUnit ? grnItemRangeSizeUnit : ""} L.C.: ${(grnItemLC ? grnItemLC : "") + '' + (grnItemLCUnit ? grnItemLCUnit : '')}<br>
            Make: ${grnItemMake ? grnItemMake : "-"} Sr.No: ${grnItemMFRNo ? grnItemMFRNo : "-"} Cal. Frequency: ${grnItemCalFreInMonths ? grnItemCalFreInMonths : "-"} months</td>
            <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="text-center align-middle">${updateItemGRN.grnItemDcNo}</td>
            <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="text-center align-middle">${grnItemStatus}</td>
        </tr>
    `;

          

        // Example usage:

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Read the HTML template file
        const filePath = path.resolve(__dirname, '../../server/templates/grnTemplate.html');
        const htmlTemplate = fs.readFileSync(filePath, 'utf8');

        // Replace placeholders with actual data
        const modifiedHTML = htmlTemplate

          .replace(/{{dcPartyItems}}/g, tableRow ? tableRow : "")
          .replace(/{{Company Name}}/g, getCompDetailsById.companyName ? getCompDetailsById.companyName : "")
          .replace(/{{Plant}}/g, getPlantAddress.plantName ? getPlantAddress.plantName : "")
          .replace(/{{PlantAddress}}/g, getPlantAddress.plantAddress ? getPlantAddress.plantAddress : "")
          .replace(/{{dcPartyName}}/g, grnPartyName ? grnPartyName : "")
          .replace(/{{dcPartyAddress}}/g, grnPartyAddress ? grnPartyAddress : "")
          .replace(/{{dcNo}}/g, grnNo ? grnNo : "")
          .replace(/{{partyDcNo}}/g, grnItemDcNo ? grnItemDcNo : "")
          .replace(/{{partyRefNo}}/g, grnPartyRefNo ? grnPartyRefNo : "")
          .replace(/{{partyRefDate}}/g, grnPartyRefDate ? dayjs(grnPartyRefDate).format('DD-MM-YYYY') : "")
          .replace(/{{dcDate}}/g, grnDate ? dayjs(grnDate).format('DD-MM-YYYY') : "")
          .replace(/{{dcCR}}/g, grnCommonRemarks ? grnCommonRemarks : "")
          .replace(/{{logo}}/g, process.env.SERVER_PORT + '/logo/' + getCompDetailsById.companyLogo)
          .replace(/{{formatNo}}/g, formatNumber ? formatNumber : "")


        // Add more replace statements for additional placeholders as needed

        // Set the modified HTML content

        console.log(modifiedHTML)
        await page.setContent(modifiedHTML, { waitUntil: 'networkidle0' });

        // Generate PDF
        await page.pdf({ path: `./storage/grnCertificates/${grnNo}.pdf`, format: 'A4' });

        await browser.close();
        console.log(process.env.SERVER_PORT)
        console.log('PDF created successfully');
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
            itemCurrentLocation,
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
            itemLocation: grnItem.isOnSiteGRN ? "department" : itemLastPlace,
            itemCurrentLocation: grnItem.isOnSiteGRN ? itemCurrentLocation : itemLastLocation,
            itemLastLocation: grnItem.isOnSiteGRN ? "" : itemCurrentLocation,
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