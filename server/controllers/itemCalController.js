const itemAddModel = require("../models/itemAddModel");
const itemCalModel = require("../models/itemCalModel")
const itemHistory = require("../models/itemHistory")
const dayjs = require('dayjs')
const { compDetailsSchema } = require("../models/compDetailsModel");
const { plantSchema } = require("../models/compDetailsModel");
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const formatNoModel = require("../models/formatNoModel");
const employeeModel = require("../models/employeeModel")

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
        ItemCalId,
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
        calReportAvailable,
        calReportName,
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
        ItemCalId,
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
        calReportAvailable,
        calReportName,
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

      const getCompDetailsById = await compDetailsSchema.findOne(
        { compId: 1 } // To return the updated document
      );
      const getPlantAddress = await plantSchema.findOne(
        { plantName: calPlant } // To return the updated document
      );

      const approvedByData = await employeeModel.findOne(
        { _id: calApprovedBy } // To return the updated document
      );


      const formatNo = await formatNoModel.findOne({ formatId: 1 });

      const formatNumber = `${formatNo.fCalDueDate ? (formatNo.fCalDueDate.frNo + " " + formatNo.fCalDueDate.amNo + " " + formatNo.fCalDueDate.amDate) : ""}`
      console.log(formatNumber)


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

        const itemData = await itemAddModel.findById(ItemCalId)

        console.log(itemData)
        let itemCondition = ""
        if (calStatus === "rejected") {
          itemCondition = "rejection"
        } else {
          itemCondition = "active"
        }
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
          itemCertificateNo,
          itemCalibratedAt,
          itemCertificateName,

          itemOBType,
          itemUncertainity,
          itemUncertainityUnit,
          itemPrevCalData,
          itemCreatedBy,
          itemLastModifiedBy
        } = itemData

        console.log(itemIMTENo)
        const updateItemFields = {
          itemIMTENo,
          itemCalDate: calItemCalDate,
          itemDueDate: calItemDueDate,
          itemLastDueDate,
          itemLastCalDate,
          itemStatus: itemCondition,
          itemLastStatus: itemStatus,
          itemCalibratedAt: "inhouse",
          itemCertificateNo: createdItem.calCertificateNo,
          itemLastCertificateNo: itemCertificateNo
        }
        const updateResult = await itemAddModel.findOneAndUpdate(
          { _id: ItemCalId },
          { $set: updateItemFields },
          { new: true }
        );
        





        if (calReportAvailable === "no") {
          const masterTable = calMasterUsed.map((item, index) => {
            let tableRow = `
                  <tr>
                      <td>${index + 1}</td>
                      <td>${item.itemIMTENo}</td>
                      <td>${item.itemAddMasterName}</td>
                      <td>${item.itemCertificateNo}</td>
                      <td>${dayjs(item.itemDueDate).format("DD-MM-YYYY")}</td>
                      <td>${item.itemCalibratedAt}</td>
                  </tr>
              `;
            return tableRow;
          });


          let calibrationTypeData = ``
          if (calItemType === "referenceStandard") {
            let refCalData = `
            <tr>
              <th colspan="4">Calibration results</th>
            </tr>
            <tr>
              <th rowspan="2">Parameter</th>
              <th rowspan="2">Nominal Size</th>
              <th >Permissible Size (${(calcalibrationData.length > 0) ? calcalibrationData[0].calNominalSizeUnit : ""})</th>
              <th rowspan="2">Observed Size (${(calcalibrationData.length > 0) ? calcalibrationData[0].calNominalSizeUnit : ""})</th>
            </tr>
            <tr>
              <th>Min/Max</th>
            </tr>
            `
            refCalData += calcalibrationData.map((item, index) => {
              let returnTable = `
                  <tr>
                    <td>${item.calParameter}</td>
                    <td>${item.calNominalSize}</td>
                    <td>${item.calMinPS + "/" + item.calMaxPS}</td>
                    ${calOBType === "minmax" ?
                  "<td>" + item.calMinOB + " / " + item.calMaxOB + "</td>" :
                  "<td>" + item.calAverageOB + "</td>"}
                    
                  </tr>`;
              return returnTable;
            }).join("");

            calibrationTypeData += refCalData
          }





          if (calItemType === "attribute") {
            let attributeCalData = `
            <tr>
                      <th colspan="5">Calibration results</th>
                    </tr>
                    <tr>
                      <th rowspan="2">Parameter</th>
                      <th rowspan="2">Nominal Size</th>
                      <th colspan="2">Permissible Size (${(calcalibrationData.length > 0) ? calcalibrationData[0].calNominalSizeUnit : ""})</th>
                      <th rowspan="2"> Observed Size (${(calcalibrationData.length > 0) ? calcalibrationData[0].calNominalSizeUnit : ""})</th>
                    </tr>
                    <tr>
                      <th>Min/Max</th>
                      <th>Wear Limit</th>
                    </tr>
      `;
            attributeCalData += calcalibrationData.map((item, index) => {
              let returnTable = `
                    <tr>
                      <td>${item.calParameter}</td>
                      <td>${item.calNominalSize}</td>
                      <td>${item.calMinPS + "/" + item.calMaxPS}</td>
                      <td>${item.calWearLimitPS}</td>
                      ${calOBType === "minmax" ?
                  "<td>" + item.calMinOB + " / " + item.calMaxOB + "</td>" :
                  "<td>" + item.calAverageOB + "</td>"}
                    </tr>`;
              return returnTable;
            }).join(""); // Removed .join("") from here
            calibrationTypeData += attributeCalData

          }



          if (calItemType === "variable") {
            let variableCalData = `
            <tr>
              <th colspan="4">Calibration results</th>
            </tr>
            <tr>
              <th >Parameter</th>
              <th >Nominal Size</th>
              <th >Permissible Error (${(calcalibrationData.length > 0) ? calcalibrationData[0].calNominalSizeUnit : ""})</th>
              <th > Observed Error (${(calcalibrationData.length > 0) ? calcalibrationData[0].calNominalSizeUnit : ""})</th>
            </tr>
            `
            variableCalData += calcalibrationData.map((item, index) => {
              let returnTable = `
                    <tr>
                      <td>${item.calParameter}</td>
                      <td>${item.calNominalSize}</td>
                      <td>${item.calMinPSError + "/" + item.calMaxPSError}</td>
                      <td>${item.calOBError}</td>
                      
                    </tr>`;
              return returnTable;
            }).join("");
            calibrationTypeData += variableCalData
          }

          // Example usage:

          const browser = await puppeteer.launch();
          const page = await browser.newPage();

          // Read the HTML template file
          const filePath = path.resolve(__dirname, '../../server/templates/calTemplate.html');
          const htmlTemplate = fs.readFileSync(filePath, 'utf8');

          // Replace placeholders with actual data
          const modifiedHTML = htmlTemplate
            .replace(/{{ItemName}}/g, calItemName)
            .replace(/{{CertificateNo}}/g, calCertificateNo)
            .replace(/{{dateOfIssue}}/g, dayjs(calItemEntryDate).format("DD-MM-YYYY"))
            .replace(/{{dateOfCalibration}}/g, dayjs(calItemCalDate).format("DD-MM-YYYY"))
            .replace(/{{nextCalibrationDue}}/g, dayjs(calItemDueDate).format("DD-MM-YYYY"))

            .replace(/{{identificationNo}}/g, calIMTENo)
            .replace(/{{slNo}}/g, calItemMFRNo)
            .replace(/{{make}}/g, calItemMake)

            .replace(/{{temperature}}/g, calItemTemperature)
            .replace(/{{humitidy}}/g, calItemHumidity)
            .replace(/{{standardRef}}/g, calStandardRef)

            .replace(/{{masterUsed}}/g, masterTable.join(""))

            .replace(/{{calCalibrationData}}/g, calibrationTypeData)

            .replace(/{{authorisedBy}}/g, calApprovedBy)

            .replace(/{{CompanyName}}/g, getCompDetailsById.companyName)


            .replace(/{{CompanyName}}/g, getCompDetailsById.companyName)
            .replace(/{{Plant}}/g, getPlantAddress.plantName)
            .replace(/{{PlantAddress}}/g, getPlantAddress.plantAddress)
            .replace(/{{logo}}/g, process.env.SERVER_PORT + '/logo/' + getCompDetailsById.companyLogo)
            .replace(/{{formatNo}}/g, formatNumber)
            .replace(/{{calibratedBy}}/g, calCalibratedBy)




          // Add more replace statements for additional placeholders as needed

          // Set the modified HTML content

          console.log(modifiedHTML)
          await page.setContent(modifiedHTML, { waitUntil: 'networkidle0' });

          // Generate PDF
          await page.pdf({ path: `./storage/calCertificates/${calCertificateNo}.pdf`, format: 'A4' });

          await browser.close();

          console.log('PDF created successfully');
        }

        let obSize = [];
        if (calReportAvailable === "no") {
          if (calcalibrationData.length > 0) {
            if (calItemType === "variable") {
              obSize = calcalibrationData.map(item => {
                return item.calParameter + ":" + item.calOBError
              })
            } else {
              obSize = calcalibrationData.map(item => {

                if (calOBType === "minmax") {
                  return item.calParameter + " : " + item.calMinOB + "/" + item.calMaxOB
                } else {
                  return item.calParameter + " : " + item.calAverageOB
                }

              })
            }
          }
        } else {
          obSize = ["Report Attached"]
        }

        console.log(obSize)
        const historyRecord = {
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
          itemStatus: itemCondition,
          itemLastStatus: itemStatus,
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
          itemCertificateNo: createdItem.calCertificateNo,
          itemLastCertificateNo: itemCertificateNo,
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
        };


        const itemHistoryCreate = await itemHistory.create(historyRecord);
      }


      console.log("ItemCal Created Successfully");
      res.status(200).json({ result: "createdItem", message: "ItemCal Created Successfully" });
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
      const id = req.params.id; // Assuming desId is part of the URL parameter





      // if (isNaN(desId)) {
      //   return res.status(400).json({ error: 'Invalid desId value' });
      // }
      const {

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
        calReportAvailable,
        calReportName,
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
        calSource
      } = req.body;
      // Create an object with the fields you want to update
      const updatedCalField = {

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
        calReportAvailable,
        calReportName,
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
        calSource
      }; 

      const getCompDetailsById = await compDetailsSchema.findOne(
        { compId: 1 } // To return the updated document
      );
      const getPlantAddress = await plantSchema.findOne(
        { plantName: calPlant } // To return the updated document
      );

      const approvedByData = await employeeModel.findOne(
        { _id: calApprovedBy } // To return the updated document
      );

      const formatNo = await formatNoModel.findOne({ formatId: 1 });

      const formatNumber = `${formatNo.fCalDueDate ? (formatNo.fCalDueDate.frNo + " " + formatNo.fCalDueDate.amNo + " " + formatNo.fCalDueDate.amDate) : ""}`
      console.log(formatNumber)

      // Find the designation by desId and update it
      const itemCalUpdate = new itemCalModel(updatedCalField);

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
      // Find the designation by desId and update it
      console.log("till working")
      const updateItemCal = await itemCalModel.findOneAndUpdate(
        { _id: id },
        { $set: updatedCalField }, // Use $set to update specific fields
        { new: true } // To return the updated document
      );
      console.log("after working")

      if (!updateItemCal) {
        return res.status(404).json({ error: 'ItemCal not found' });
      } else {
        let itemCondition = ""
        if (calStatus === "rejected") {
          itemCondition = "rejection"
        } else {
          itemCondition = "active"
        }
        console.log(updateItemCal)
        const itemData = await itemAddModel.find({ _id: updateItemCal.ItemCalId })

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
          itemReceiptDate,
          itemDepartment,
          itemCalFreInMonths,
          itemCalAlertDays,
          itemCalibrationSource,
          itemCalibrationDoneAt,
          itemItemMasterName,
          itemItemMasterIMTENo,
          itemCalibratedAt,
          itemCertificateName,

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
          itemStatus: itemCondition,
          itemCertificateNo: updateItemCal.calCertificateNo,


        }
        const itemUpdate = new itemAddModel(updateItemFields);

        const updateResult = await itemAddModel.findOneAndUpdate(
          { _id: updateItemCal.ItemCalId },
          { $set: updateItemFields },
          { new: true }
        );


        if (calReportAvailable === "no") {
          const masterTable = calMasterUsed.map((item, index) => {
            let tableRow = `
                  <tr>
                      <td>${index + 1}</td>
                      <td>${item.itemIMTENo}</td>
                      <td>${item.itemAddMasterName}</td>
                      <td>${item.itemCertificateNo}</td>
                      <td>${dayjs(item.itemDueDate).format("DD-MM-YYYY")}</td>
                      <td>${item.itemCalibratedAt}</td>
                  </tr>
              `;
            return tableRow;
          });


          let calibrationTypeData = ``
          if (calItemType === "referenceStandard") {
            let refCalData = `
            <tr>
              <th colspan="4">Calibration results</th>
            </tr>
            <tr>
              <th rowspan="2">Parameter</th>
              <th rowspan="2">Nominal Size</th>
              <th >Permissible Size (${(calcalibrationData.length > 0) ? calcalibrationData[0].calNominalSizeUnit : ""})</th>
              <th rowspan="2">Observed Size (${(calcalibrationData.length > 0) ? calcalibrationData[0].calNominalSizeUnit : ""})</th>
            </tr>
            <tr>
              <th>Min/Max</th>
            </tr>
            `
            refCalData += calcalibrationData.map((item, index) => {
              let returnTable = `
                  <tr>
                    <td>${item.calParameter}</td>
                    <td>${item.calNominalSize}</td>
                    <td>${item.calMinPS + "/" + item.calMaxPS}</td>
                    ${calOBType === "minmax" ?
                  "<td>" + item.calMinOB + " / " + item.calMaxOB + "</td>" :
                  "<td>" + item.calAverageOB + "</td>"}
                    
                  </tr>`;
              return returnTable;
            }).join("");

            calibrationTypeData += refCalData
          }





          if (calItemType === "attribute") {
            let attributeCalData = `
            <tr>
                      <th colspan="5">Calibration results</th>
                    </tr>
                    <tr>
                      <th rowspan="2">Parameter</th>
                      <th rowspan="2">Nominal Size</th>
                      <th colspan="2">Permissible Size (${(calcalibrationData.length > 0) ? calcalibrationData[0].calNominalSizeUnit : ""})</th>
                      <th rowspan="2"> Observed Size (${(calcalibrationData.length > 0) ? calcalibrationData[0].calNominalSizeUnit : ""})</th>
                    </tr>
                    <tr>
                      <th>Min/Max</th>
                      <th>Wear Limit</th>
                    </tr>
      `;
            attributeCalData += calcalibrationData.map((item, index) => {
              let returnTable = `
                    <tr>
                      <td>${item.calParameter}</td>
                      <td>${item.calNominalSize}</td>
                      <td>${item.calMinPS + "/" + item.calMaxPS}</td>
                      <td>${item.calWearLimitPS}</td>
                      ${calOBType === "minmax" ?
                  "<td>" + item.calMinOB + " / " + item.calMaxOB + "</td>" :
                  "<td>" + item.calAverageOB + "</td>"}
                    </tr>`;
              return returnTable;
            }).join(""); // Removed .join("") from here
            calibrationTypeData += attributeCalData

          }



          if (calItemType === "variable") {
            let variableCalData = `
            <tr>
              <th colspan="4">Calibration results</th>
            </tr>
            <tr>
              <th >Parameter</th>
              <th >Nominal Size</th>
              <th >Permissible Error (${(calcalibrationData.length > 0) ? calcalibrationData[0].calNominalSizeUnit : ""})</th>
              <th > Observed Error (${(calcalibrationData.length > 0) ? calcalibrationData[0].calNominalSizeUnit : ""})</th>
            </tr>
            `
            variableCalData += calcalibrationData.map((item, index) => {
              let returnTable = `
                    <tr>
                      <td>${item.calParameter}</td>
                      <td>${item.calNominalSize}</td>
                      <td>${item.calMinPSError + "/" + item.calMaxPSError}</td>
                      <td>${item.calOBError}</td>
                      
                    </tr>`;
              return returnTable;
            }).join("");
            calibrationTypeData += variableCalData
          }

          // Example usage:

          const browser = await puppeteer.launch();
          const page = await browser.newPage();

          // Read the HTML template file
          const filePath = path.resolve(__dirname, '../../server/templates/calTemplate.html');
          const htmlTemplate = fs.readFileSync(filePath, 'utf8');

          // Replace placeholders with actual data
          const modifiedHTML = htmlTemplate
            .replace(/{{ItemName}}/g, calItemName)
            .replace(/{{CertificateNo}}/g, calCertificateNo)
            .replace(/{{dateOfIssue}}/g, dayjs(calItemEntryDate).format("DD-MM-YYYY"))
            .replace(/{{dateOfCalibration}}/g, dayjs(calItemCalDate).format("DD-MM-YYYY"))
            .replace(/{{nextCalibrationDue}}/g, dayjs(calItemDueDate).format("DD-MM-YYYY"))

            .replace(/{{identificationNo}}/g, calIMTENo)
            .replace(/{{slNo}}/g, calItemMFRNo)
            .replace(/{{make}}/g, calItemMake)

            .replace(/{{temperature}}/g, calItemTemperature)
            .replace(/{{humitidy}}/g, calItemHumidity)
            .replace(/{{standardRef}}/g, calStandardRef)

            .replace(/{{masterUsed}}/g, masterTable.join(""))

            .replace(/{{calCalibrationData}}/g, calibrationTypeData)

            .replace(/{{authorisedBy}}/g, approvedByData ? approvedByData.firstName + " " + approvedByData.lastName : "")

            .replace(/{{CompanyName}}/g, getCompDetailsById.companyName)


            .replace(/{{CompanyName}}/g, getCompDetailsById.companyName)
            .replace(/{{Plant}}/g, getPlantAddress.plantName)
            .replace(/{{PlantAddress}}/g, getPlantAddress.plantAddress)
            .replace(/{{logo}}/g, process.env.SERVER_PORT + '/logo/' + getCompDetailsById.companyLogo)
            .replace(/{{formatNo}}/g, formatNumber)
            .replace(/{{calibratedBy}}/g, calCalibratedBy)




          // Add more replace statements for additional placeholders as needed

          // Set the modified HTML content

          console.log(modifiedHTML)
          await page.setContent(modifiedHTML, { waitUntil: 'networkidle0' });

          // Generate PDF
          await page.pdf({ path: `./storage/calCertificates/${calCertificateNo}.pdf`, format: 'A4' });

          await browser.close();

          console.log('PDF created successfully');
        }


        let obSize = [];
        if (calReportAvailable === "no") {
          if (calcalibrationData.length > 0) {
            if (calItemType === "variable") {
              obSize = calcalibrationData.map(item => {
                return item.calParameter + ":" + item.calOBError
              })
            } else {
              obSize = calcalibrationData.map(item => {

                if (calOBType === "minmax") {
                  return item.calParameter + " : " + item.calMinOB + "/" + item.calMaxOB
                } else {
                  return item.calParameter + " : " + item.calAverageOB
                }

              })
            }
          }
        } else {
          obSize = ["Report Attached"]
        }



        const historyRecord = {
          isItemMaster,
          itemAddMasterName,
          itemIMTENo,
          itemType,
          itemRangeSize,
          itemRangeSizeUnit,
          itemLC,
          itemLCUnit,
          itemModelNo,
          itemStatus: itemCondition,
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
          itemCertificateNo: updateItemCal.calCertificateNo,
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
        };

        const historyResult = await itemHistory.findOneAndUpdate(
          { itemCalId: id },
          { $set: historyRecord },
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


      for (const id of itemCalIds) {
        // Find and remove each vendor by _id


        const calData = await itemCalModel.findById(id);
        const itemData = await itemAddModel.findById(calData.ItemCalId)

        const { itemLastCalDate: itemCalDate, itemLastDueDate: itemDueDate, itemLastStatus: itemStatus, itemLastCertificateNo: itemCertificateNo } = itemData
        const updateItemFields = { itemCalDate, itemDueDate, itemStatus, itemCertificateNo }
        const updateResult = await itemAddModel.findOneAndUpdate(
          { _id: calData.ItemCalId },
          { $set: updateItemFields },
          { new: true }
        );

        const deletedItemCal = await itemCalModel.findOneAndRemove({ _id: id });
        const deleteHistoryCard = await itemHistory.findOneAndRemove({ itemCalId: id });
        console.log(deletedItemCal)
        console.log(deleteHistoryCard)
        if (!deletedItemCal && !deleteHistoryCard) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`ItemCal with ID ${id} not found.`);
          res.status(500).json({ message: `ItemCal with ID not found.` });

        } else {
          console.log(`ItemCal with ID ${id} deleted successfully.`);

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