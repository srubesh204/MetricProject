const { itemGRNModel, GrnNoCounter } = require("../models/itemGRNModel")
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
      const { allowedPlants } = req.body
      const itemGRNResult = await itemGRNModel.aggregate([
        {
          $match: {
            "grnPlant": { $in: allowedPlants ? allowedPlants : [] } // Specify the values to match
          }
        }, { $sort: { grnNo: -1 } }
      ])
      res.status(202).json({ result: itemGRNResult, status: 1 });

    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Item GRN');
    }
  },
  getNextGRNNo: async (req, res) => {
    try {
      const currentYear = new Date().getFullYear();
      let counter = await GrnNoCounter.findById('GrnNoCounter');
      const prefix = await formatNoModel.findById('formatNo');

      if (!counter) {
        // If the counter document doesn't exist, create it in memory
        counter = { _id: 'GrnNoCounter', seq: 1, year: currentYear };
      } else if (counter.year !== currentYear) {
        // If the year has changed, reset the counter and update the year in memory
        counter.seq = 1;
        counter.year = currentYear;
      } else {
        // Otherwise, increment the counter in memory
        counter.seq++;
      }

      const nextGrnNo = `${prefix && prefix.fCommonPrefix ? prefix.fCommonPrefix : ""}GRN${currentYear}-${String(counter.seq).padStart(2, '0')}`;

      res.status(202).json({ result: nextGrnNo, status: 1 });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Item Grn Next No Get', err);
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
        grnItemSAPNo,
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
        grnItemCalFrequencyType,
        grnItemCalAlertDays,
        grnItemCalibrationSource,
        grnItemCalibrationDoneAt,
        grnItemCalibratedAt,
        grnItemOBType,
        grnItemStatus,
        grnAssingStatus,
        grnAcCriteria,
        grnItemUncertainity,
        grnItemCalDate,
        grnItemDueDate,
        grnItemCertificateStatus,
        grnItemCertificateNo,
        grnItemCertificate,
        grnUncertainity,
        grnItemCalStatus,
        isOnSiteGRN,
        grnCreatedBy,
        grnItemSOPNo,
        grnItemStandardRef,
        grnItemMasterUncertainty,
        grnItemMasterUncertaintyUnit
      } = req.body;


      const itemGRNResult = new itemGRNModel({
        grnPartyRefNo,
        grnPartyId,
        grnPartyRefDate,
        grnPartyName,
        grnPartyCode,
        grnPartyAddress,

        grnDate,
        grnCommonRemarks,
        grnPlant,
        grnDepartment,
        grnItemId,
        grnItemAddMasterName,
        grnItemType,
        grnItemIMTENo,
        grnItemSAPNo,
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
        grnItemCalFrequencyType,
        grnItemCalAlertDays,
        grnItemCalibrationSource,
        grnItemCalibrationDoneAt,
        grnItemCalibratedAt,
        grnItemOBType,
        grnItemStatus,
        grnAssingStatus,
        grnAcCriteria,
        grnItemUncertainity,
        grnItemCalDate,
        grnItemDueDate,
        grnItemCertificateStatus,
        grnItemCertificateNo,
        grnItemCertificate,
        grnUncertainity,
        grnItemCalStatus,
        isOnSiteGRN,
        grnCreatedBy,
        grnItemSOPNo,
        grnItemStandardRef,
        grnItemMasterUncertainty,
        grnItemMasterUncertaintyUnit
      });

      const getCompDetailsById = await compDetailsSchema.findById("companyData");
      const getPlantAddress = await plantSchema.findOne(
        { plantName: grnPlant } // To return the updated document
      );

      const formatNo = await formatNoModel.findById("formatNo");

      const formatNumber = `${formatNo && formatNo.fGrn ? ("Format Number : " + formatNo.fGrn.frNo + " " + "Rev.No : " + formatNo.fGrn.amNo + " " + "Rev.Date :  " + formatNo.fGrn.amDate) : ""}`
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
        if (result.grnItemStatus === "Calibrated") {
          if (result.grnItemCalStatus === "rejected") {
            itemCondition = "rejection"
          } else {
            itemCondition = "active"
          }
        } else {
          itemCondition = result.grnAssingStatus
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

          itemOBType,
          itemUncertainity,
          itemUncertainityUnit,
          itemPrevCalData,
          itemCertificateNo: itemLastCertificateNo,
        } = itemData


        const updateItemFields = {
          itemIMTENo,
          itemLastPlace: result.isOnSiteGRN === "yes" ? "" : itemLastPlace,
          itemCurrentLocation: result.isOnSiteGRN === "yes" ? itemCurrentLocation : itemDepartment,
          itemLastLocation: result.isOnSiteGRN === "yes" ? "" : itemLastLocation,
          itemLocation: "department",
          itemLastCalDate: result.grnItemStatus === "Calibrated" ? itemLastCalDate : itemCalDate,
          itemLastDueDate: result.grnItemStatus === "Calibrated" ? itemLastDueDate : itemDueDate,
          itemStatus: itemCondition,
          itemLastStatus: itemStatus,
          itemCalDate: result.grnItemStatus === "Calibrated" ? result.grnItemCalDate : itemLastCalDate,
          itemDueDate: result.grnItemStatus === "Calibrated" ? result.grnItemDueDate : itemLastDueDate,
          grnId: result._id,
          grnStatus: "1",
          grnCreatedOn: result.grnDate,
          grnNo: result.grnNo,
          lastDcId,
          lastDcStatus,
          lastDcCreatedOn,
          lastDcNo,
          dcStatus: "0",
          dcNo: "",
          dcId: "",
          dcCreatedOn: "",
          itemCertificateNo: result.grnItemCertificateNo,
          itemLastCertificateNo,

        }
        const updateResult = await itemAddModel.findOneAndUpdate(
          { _id: grnItemId },
          { $set: updateItemFields },
          { new: true }
        );

        console.log(result.grnAcCriteria)
        let obSize = [];

        if (result.grnAcCriteria.length > 0) {

          console.log(result.grnItemType)
          if (result.grnItemType === "variable") {
            obSize = result.grnAcCriteria.map(item => {
              return item.grnParameter + ":" + item.grnOBError
            })
          } else {
            obSize = result.grnAcCriteria.map(item => {

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
          itemLastCalDate: result.grnItemStatus === "Calibrated" ? itemLastCalDate : itemCalDate,
          itemLastDueDate: result.grnItemStatus === "Calibrated" ? itemLastDueDate : itemDueDate,
          itemCalDate: result.grnItemStatus === "Calibrated" ? result.grnItemCalDate : itemLastCalDate,
          itemDueDate: result.grnItemStatus === "Calibrated" ? result.grnItemDueDate : itemLastDueDate,
          grnId: result._id,
          grnStatus: "1",
          grnCreatedOn: result.grnDate,
          grnNo: result.grnNo,
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
          itemCalStatus: result.grnItemCalStatus,
          itemCalibrationDoneAt,
          itemUncertainityUnit,
          itemPrevCalData,
          itemCalibratedAt: result.grnPartyName,
          itemCertificateName: result.grnItemCertificate,
          itemOBType,
          itemUncertainity,
          itemLastCertificateNo,
          itemCertificateNo: result.grnItemCertificateNo,
          acceptanceCriteria: obSize
        });
        const itemHistoryData = await historyRecord.save();

        console.log(itemHistoryData, "Historysaved")

        let tableRow = `
        <tr>
            <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="text-center align-middle">1</td>
            <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="align-middle">Item Name: ${result.grnItemAddMasterName ? result.grnItemAddMasterName : "-"} IMTE No: ${result.grnItemIMTENo ? result.grnItemIMTENo : "-"} SAP No: ${result.grnItemSAPNo ? result.grnItemSAPNo : "-"}<br>
            Range/Size: ${result.grnItemRangeSize ? result.grnItemRangeSize : "" + ' ' + result.grnItemRangeSizeUnit ? result.grnItemRangeSizeUnit : ""} L.C.: ${(result.grnItemLC ? result.grnItemLC : "") + '' + (result.grnItemLCUnit ? result.grnItemLCUnit : '')}<br>
            Make: ${result.grnItemMake ? result.grnItemMake : "-"} Sr.No: ${result.grnItemMFRNo ? result.grnItemMFRNo : "-"} Cal. Frequency: ${result.grnItemCalFreInMonths ? result.grnItemCalFreInMonths : "-"} ${result.grnItemCalFrequencyType ? result.grnItemCalFrequencyType : ""}</td>
            <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="text-center align-middle">${result.grnItemDcNo ? result.grnItemDcNo : "-"}</td>
            <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="text-center align-middle">${result.grnItemStatus ? result.grnItemStatus : "-"}</td>
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
          .replace(/{{dcPartyName}}/g, result.grnPartyName ? result.grnPartyName : "")
          .replace(/{{dcPartyAddress}}/g, result.grnPartyAddress ? result.grnPartyAddress : "")
          .replace(/{{dcNo}}/g, result.grnNo ? result.grnNo : "")
          .replace(/{{partyDcNo}}/g, result.grnItemDcNo ? result.grnItemDcNo : "")
          .replace(/{{partyRefNo}}/g, result.grnPartyRefNo ? result.grnPartyRefNo : "")
          .replace(/{{partyRefDate}}/g, result.grnPartyRefDate ? dayjs(result.grnPartyRefDate).format('DD-MM-YYYY') : "")
          .replace(/{{dcDate}}/g, result.grnDate ? dayjs(result.grnDate).format('DD-MM-YYYY') : "")
          .replace(/{{dcCR}}/g, result.grnCommonRemarks ? result.grnCommonRemarks : "")
          .replace(/{{logo}}/g, process.env.SERVER_PORT + '/logo/' + getCompDetailsById.companyLogo)
          .replace(/{{formatNo}}/g, formatNumber ? formatNumber : "")


        // Add more replace statements for additional placeholders as needed

        // Set the modified HTML content

        console.log(modifiedHTML)
        const cssPath = path.resolve(__dirname, '../templates/bootstrap.min.css');

        await page.setContent(modifiedHTML, { waitUntil: 'domcontentloaded' });
        await page.addStyleTag({ path: cssPath });

        // Generate PDF
        await page.pdf({ path: `./storage/grnCertificates/${result.grnNo}.pdf`, format: 'A4' });

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
        grnItemSAPNo,
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
        grnItemCalFrequencyType,
        grnItemCalAlertDays,
        grnItemCalibrationSource,
        grnItemCalibrationDoneAt,
        grnItemCalibratedAt,
        grnItemOBType,
        grnItemStatus,
        grnAssingStatus,
        grnAcCriteria,
        grnItemUncertainity,
        grnItemCalDate,
        grnItemDueDate,
        grnItemCertificateStatus,
        grnItemCertificateNo,
        grnItemCertificate,
        grnUncertainity,
        grnItemCalStatus,
        isOnSiteGRN,
        grnCreatedBy,
        grnItemSOPNo,
        grnItemStandardRef,
        grnItemMasterUncertainty,
        grnItemMasterUncertaintyUnit
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
        grnItemSAPNo,
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
        grnItemCalFrequencyType,
        grnItemCalAlertDays,
        grnItemCalibrationSource,
        grnItemCalibrationDoneAt,
        grnItemCalibratedAt,
        grnItemOBType,
        grnItemStatus,
        grnAssingStatus,
        grnAcCriteria,
        grnItemUncertainity,
        grnItemCalDate,
        grnItemDueDate,
        grnItemCertificateStatus,
        grnItemCertificateNo,
        grnItemCertificate,
        grnUncertainity,
        grnItemCalStatus,
        isOnSiteGRN,
        grnCreatedBy,
        grnItemSOPNo,
        grnItemStandardRef,
        grnItemMasterUncertainty,
        grnItemMasterUncertaintyUnit
      };


      const getCompDetailsById = await compDetailsSchema.findById("companyData");
      const getPlantAddress = await plantSchema.findOne(
        { plantName: grnPlant } // To return the updated document
      );

      const formatNo = await formatNoModel.findById("formatNo");

      const formatNumber = `${formatNo && formatNo.fGrn ? ("Format Number : " + formatNo.fGrn.frNo + "  " + "Rev.No : " + formatNo.fGrn.amNo + "  " + " Rev.Date : " + formatNo.fGrn.amDate) : ""}`
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
        if (updateItemGRN.grnItemStatus === "Calibrated") {
          if (updateItemGRN.grnItemCalStatus === "rejected") {
            itemCondition = "rejection"
          } else {
            itemCondition = "active"
          }
        } else {
          itemCondition = updateItemGRN.grnAssingStatus
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
          itemLastPlace: updateItemGRN.isOnSiteGRN === "yes" ? "" : itemLastPlace,
          itemCurrentLocation: updateItemGRN.isOnSiteGRN === "yes" ? itemCurrentLocation : itemDepartment,
          itemLastLocation: updateItemGRN.isOnSiteGRN === "yes" ? "" : itemLastLocation,
          itemLocation: "department",
          itemLastCalDate: grnItemStatus === "Calibrated" ? itemLastCalDate : itemCalDate,
          itemLastDueDate: grnItemStatus === "Calibrated" ? itemLastDueDate : itemDueDate,
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
            <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="align-middle">Item Name: ${grnItemAddMasterName ? grnItemAddMasterName : "-"} IMTE No: ${grnItemIMTENo ? grnItemIMTENo : "-"} SAP No:${grnItemSAPNo ? grnItemSAPNo : "-"} <br>
            Range/Size: ${grnItemRangeSize ? grnItemRangeSize : "" + ' ' + grnItemRangeSizeUnit ? grnItemRangeSizeUnit : ""} L.C.: ${(grnItemLC ? grnItemLC : "") + '' + (grnItemLCUnit ? grnItemLCUnit : '')}<br>
            Make: ${grnItemMake ? grnItemMake : "-"} Sr.No: ${grnItemMFRNo ? grnItemMFRNo : "-"} Cal. Frequency: ${grnItemCalFreInMonths ? grnItemCalFreInMonths : "" + ' ' + grnItemCalFrequencyType ? grnItemCalFrequencyType : ""}</td>
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
        const cssPath = path.resolve(__dirname, '../templates/bootstrap.min.css');

        await page.setContent(modifiedHTML, { waitUntil: 'domcontentloaded' });
        await page.addStyleTag({ path: cssPath });
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
            itemLocation: grnItem.isOnSiteGRN === "yes" ? "department" : itemLastPlace,
            itemCurrentLocation: grnItem.isOnSiteGRN === "yes" ? itemCurrentLocation : itemLastLocation,
            itemLastLocation: grnItem.isOnSiteGRN === "yes" ? "" : itemCurrentLocation,
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