const itemAddModel = require("../models/itemAddModel");
const { itemDcModel, DcNoCounter } = require("../models/itemDcModel")
const { compDetailsSchema } = require("../models/compDetailsModel");
const { plantSchema } = require("../models/compDetailsModel");
const dayjs = require('dayjs')
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const formatNoModel = require("../models/formatNoModel");
const {itemGRNModel} = require("../models/itemGRNModel");

const itemDcController = {
  getAllItemDc: async (req, res) => {
    try {
      const {allowedPlants} = req.body
      // const itemDcResult = await itemDcModel.find();
      const itemDcResult = await itemDcModel.aggregate([
        {
          $match: {
            "dcPlant": { $in: allowedPlants ? allowedPlants : [] } // Specify the values to match
          }
        }, { $sort: { dcNo: -1 } }
      ])
      res.status(202).json({ result: itemDcResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Item Dc');
    }
  },

  getNextDcNo: async (req, res) => {
    try {
      const currentYear = new Date().getFullYear();
      let counter = await DcNoCounter.findById('dcNoCounter');
      const prefix = await formatNoModel.findById('formatNo');

      if (!counter) {
        // If the counter document doesn't exist, create it in memory
        counter = { _id: 'dcNoCounter', seq: 1, year: currentYear };
      } else if (counter.year !== currentYear) {
        // If the year has changed, reset the counter and update the year in memory
        counter.seq = 1;
        counter.year = currentYear;
      } else {
        // Otherwise, increment the counter in memory
        counter.seq++;
      }

      const nextDcNo = `${prefix && prefix.fCommonPrefix ? prefix.fCommonPrefix : ""}DC${currentYear}-${String(counter.seq).padStart(2, '0')}`;

      res.status(202).json({ result: nextDcNo, status: 1 });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Item Dc Get');
    }

  },
  createItemDc: async (req, res) => {

    try {
      const { dcPartyName, dcPartyId, dcPartyType, dcPartyCode, dcPartyAddress, dcDate, dcReason, dcCommonRemarks, dcMasterName, dcPartyItems, dcPlant, dcDepartment, dcCreatedBy } = req.body;
      const itemDcResult = new itemDcModel({ dcPartyName, dcPartyId, dcPartyType, dcPartyCode, dcPartyAddress, dcDate, dcReason, dcCommonRemarks, dcMasterName, dcPartyItems, dcPlant, dcDepartment, dcCreatedBy });


      

      const getCompDetailsById = await compDetailsSchema.findById("companyData");
      const getPlantAddress = await plantSchema.findOne(
        { plantName: dcPlant } // To return the updated document
      );

      const formatNo = await formatNoModel.findById("formatNo");

      const formatNumber = `${formatNo && formatNo.fDc ? (formatNo.fDc.frNo + " " + formatNo.fDc.amNo + " " + formatNo.fDc.amDate) : ""}`
      console.log(getCompDetailsById)

      const validationError = itemDcResult.validateSync();

      if (validationError) {
        // Handle validation errors
        const validationErrors = {};

        if (validationError.errors) {
          // Convert Mongoose validation error details to a more user-friendly format
          for (const key in validationError.errors) {
            validationErrors[key] = validationError.errors[key].message;
          }
        }
        console.log(validationErrors)
        return res.status(400).json({
          errors: validationErrors
        });
      }




      const result = await itemDcResult.save();



      if (Object.keys(result).length !== 0) {

        const updatePromises = dcPartyItems.map(async (item) => {

          const itemData = await itemAddModel.findById(item._id)
          const { itemIMTENo, itemCurrentLocation: itemLastLocation } = itemData
          const updateItemFields = {
            itemIMTENo,
            itemCurrentLocation: dcPartyName,
            itemLastLocation,


            itemLocation: dcPartyType,
            dcId: result._id,
            dcStatus: "1",
            dcCreatedOn: dcDate,
            dcNo: result.dcNo
          }
          const updateResult = await itemAddModel.findOneAndUpdate(
            { _id: item._id },
            { $set: updateItemFields },
            { new: true }
          );

          return updateResult;
        });
        const updatedItems = await Promise.all(updatePromises);


        const itemsData = dcPartyItems.map((item, index) => {
          let tableRow = `
              <tr>
                  <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="text-center align-middle">${index + 1}</td>
                  <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="align-middle">Item Name: ${item.itemAddMasterName ? item.itemAddMasterName : "-"} IMTE No: ${item.itemIMTENo ? item.itemIMTENo : "-"} SAP No: ${item.itemSAPNo ? item.itemSAPNo : "-"}<br>
                  Range/Size: ${(item.itemRangeSize && item.itemRangeSize !== "undefined" ? item.itemRangeSize : "-") + " " + (item.itemRangeSizeUnit && item.itemRangeSizeUnit !== "undefined" ? item.itemRangeSizeUnit : "")} L.C.: ${(item.itemLC ? item.itemLC : "") + ' ' + (item.itemLCUnit ? item.itemLCUnit : '')}<br>
                  Make: ${item.itemMake ? item.itemMake : "-"} Sr.No: ${item.itemMFRNo ? item.itemMFRNo : "-"} Cal. Frequency: ${item.itemCalFreInMonths ? item.itemCalFreInMonths : "-"} months</td>
                  <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="text-center align-middle">${item.dcItemRemarks}</td>
              </tr>
             
          `;

          return tableRow;
        });


        // Example usage:

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Read the HTML template file
        const filePath = path.resolve(__dirname, '../../server/templates/dcTemplate.html');
        const htmlTemplate = fs.readFileSync(filePath, 'utf8');

        // Replace placeholders with actual data
        const modifiedHTML = htmlTemplate

          .replace(/{{dcPartyItems}}/g, itemsData.join(""))
          .replace(/{{CompanyName}}/g, getCompDetailsById && getCompDetailsById.companyName ? getCompDetailsById.companyName : "")

          .replace(/{{Plant}}/g, getPlantAddress.plantName)
          .replace(/{{PlantAddress}}/g, getPlantAddress.plantAddress)
          .replace(/{{dcPartyName}}/g, dcPartyName)
          .replace(/{{dcPartyAddress}}/g, dcPartyAddress)
          .replace(/{{dcNo}}/g, result.dcNo)
          .replace(/{{dcDate}}/g, dayjs(dcDate).format("DD-MM-YYYY"))
          .replace(/{{dcCR}}/g, dcCommonRemarks)
          .replace(/{{dcCReason}}/, dcReason)
          .replace(/{{logo}}/g, process.env.SERVER_PORT + '/logo/' + getCompDetailsById.companyLogo || "")
          .replace(/{{formatNo}}/g, formatNumber)


        // Add more replace statements for additional placeholders as needed

        // Set the modified HTML content


        const cssPath = path.resolve(__dirname, '../templates/bootstrap.min.css');

        await page.setContent(modifiedHTML, { waitUntil: 'networkidle0' });

        // Add the CSS file
        await page.addStyleTag({ path: cssPath });

        // Generate PDF
        await page.pdf({ path: `./storage/dcCertificate/${result.dcNo}.pdf`, format: 'A4' });

        await browser.close();

        console.log('PDF created successfully');
      }



      return res.status(200).json({ message: "Item Dc Data Successfully Saved", status: 1, result: "result" });
    } catch (error) {
      console.log(error)
      if (error.errors) {
        const errors500 = {};
        for (const key in error.errors) {
          errors500[key] = error.errors[key].message;
        }
        return res.status(500).json({ error: errors500, status: 0 });
      }

      return res.status(500).json({ error: 'Internal server error on Item Dc', status: 0 });
    }
  },

  updateItemDc: async (req, res) => {
    try {
      const itemDcId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      //   return res.status(400).json({ error: 'Invalid desId value' });
      // }

      // Create an object with the fields you want to update
      const { dcPartyName, dcPartyId, dcPartyType, dcPartyCode, dcPartyAddress, dcDate, dcReason, dcCommonRemarks, dcMasterName, dcPartyItems, dcPlant, dcDepartment, dcCreatedBy } = req.body;
      const updateItemDcFields = { dcPartyName, dcPartyId, dcPartyType, dcPartyCode, dcPartyAddress, dcDate, dcReason, dcCommonRemarks, dcMasterName, dcPartyItems, dcPlant, dcDepartment, dcCreatedBy };




      // Setting the prevData to status "0" 
      const prevItemDc = await itemDcModel.findById(itemDcId)
      const { dcPartyItems: prevPartyItems } = prevItemDc

      const dcDeleteStatus = async () => {
        // Fetch item data from itemAddModel for items with dcStatus !== "0" in prevPartyItems
        const prevItemsData = (await Promise.all(prevPartyItems.map(async (prevItem) => {
          return await itemAddModel.findOne({ _id: prevItem._id, dcStatus: { $ne: "1" } });
        }))).filter(item => item !== null);
        console.log(prevItemsData.length)
        // Fetch item data from itemAddModel for items in dcPartyItems
        const dcItemsData = (await Promise.all(dcPartyItems.map(async (dcItem) => {
          return await itemAddModel.findOne({ _id: dcItem._id });
        }))).filter(item => item !== null);
        console.log(dcItemsData.length)
        // Check if any item with dcStatus !== "0" in prevItemsData is not present in dcItemsData
        const hasDifferentStatus = prevItemsData.some(prevItem => !dcItemsData.find(dcItem => dcItem._id.toString() === prevItem._id.toString()));
        // If any item with dcStatus !== "0" is found in prevItemsData that is not present in dcItemsData, return false
        return !hasDifferentStatus;
      };
      const status = await dcDeleteStatus()
      console.log(status)
      if (status) {

        const prevUpdatePromises = prevPartyItems.map(async (item) => {

          const itemData = await itemAddModel.findById(item._id)


          const { itemIMTENo, itemLastLocation } = itemData
          const updateItemFields = {
            itemIMTENo,
            itemCurrentLocation: itemLastLocation,
            itemLocation: "department",
            dcId: "",
            dcStatus: "0",
            dcCreatedOn: "",
            dcNo: ""
          }
          const updateResult = await itemAddModel.findOneAndUpdate(
            { _id: item._id },
            { $set: updateItemFields },
            { new: true }
          );
          
          return updateResult;
        });
        const prevUpdatedValues = await Promise.all(prevUpdatePromises);
        //
        const getCompDetailsById = await compDetailsSchema.findById("companyData");
        const getPlantAddress = await plantSchema.findOne(
          { plantName: dcPlant } // To return the updated document
        );

        const formatNo = await formatNoModel.findById("formatNo");

        const formatNumber = `${formatNo.fDc ? (formatNo.fDc.frNo + " " + formatNo.fDc.amNo + " " + formatNo.fDc.amDate) : ""}`
       

        const itemDcUpdate = new itemDcModel(updateItemDcFields);


        const validationError = itemDcUpdate.validateSync();
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
        const updateItemDc = await itemDcModel.findOneAndUpdate(
          { _id: itemDcId },
          updateItemDcFields,
          { new: true } // To return the updated document
        );

        if (Object.keys(updateItemDc).length !== 0) {
          const updatePromises = dcPartyItems.map(async (item) => {

            const itemData = await itemAddModel.findById(item._id)
            const { itemIMTENo, itemCurrentLocation: itemLastLocation } = itemData
            const updateItemFields = {
              itemIMTENo,
              itemCurrentLocation: dcPartyName,
              itemLastLocation,
              itemLocation: dcPartyType,
              dcId: updateItemDc._id,
              dcStatus: "1",
              dcCreatedOn: dcDate,
              dcNo: updateItemDc.dcNo
            }
            const updateResult = await itemAddModel.findOneAndUpdate(
              { _id: item._id },
              { $set: updateItemFields },
              { new: true }
            );
           
            return updateResult;
          });
          const updatedItems = await Promise.all(updatePromises);


          const itemsData = dcPartyItems.map((item, index) => {
            let tableRow = `
                <tr>
                    <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="text-center align-middle">${index + 1}</td>
                    <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="align-middle">Item Name: ${item.itemItemMasterName ? item.itemItemMasterName : "-"} IMTE No: ${item.itemIMTENo ? item.itemIMTENo : "-"} SAP No: ${item.itemSAPNo ? item.itemSAPNo : "-"} <br>
                    Range/Size: ${item.itemRangeSize ? item.itemRangeSize : "" + ' ' + item.itemRangeSizeUnit ? item.itemRangeSizeUnit : ""} L.C.: ${(item.itemLC ? item.itemLC : "") + '' + (item.itemLCUnit ? item.itemLCUnit : '')}<br>
                    Make: ${item.itemMake ? item.itemMake : "-"} Sr.No: ${item.itemMFRNo ? item.itemMFRNo : "-"} Cal. Frequency: ${item.itemCalFreInMonths ? item.itemCalFreInMonths : "-"} months</td>
                    <td style="padding: 0.50rem; vertical-align: top; border: 1px solid #6c757d ;" class="text-center align-middle">${item.dcItemRemarks}</td>
                </tr>
            `;

            return tableRow;
          });


          // Example usage:

          const browser = await puppeteer.launch();
          const page = await browser.newPage();

          // Read the HTML template file
          const filePath = path.resolve(__dirname, '../../server/templates/dcTemplate.html');
          const htmlTemplate = fs.readFileSync(filePath, 'utf8');

          // Replace placeholders with actual data
          const modifiedHTML = htmlTemplate

            .replace(/{{dcPartyItems}}/g, itemsData.join(""))
            .replace(/{{CompanyName}}/g, getCompDetailsById.companyName)
            .replace(/{{Plant}}/g, getPlantAddress.plantName)
            .replace(/{{PlantAddress}}/g, getPlantAddress.plantAddress)
            .replace(/{{dcPartyName}}/g, dcPartyName)
            .replace(/{{dcPartyAddress}}/g, dcPartyAddress)
            .replace(/{{dcNo}}/g, updateItemDc.dcNo)
            .replace(/{{dcDate}}/g, dcDate)
            .replace(/{{dcCR}}/g, dcCommonRemarks)
            .replace(/{{dcCReason}}/, dcReason)
            .replace(/{{logo}}/g, process.env.SERVER_PORT + '/logo/' + getCompDetailsById.companyLogo)
            .replace(/{{formatNo}}/g, formatNumber)


          // Add more replace statements for additional placeholders as needed

          // Set the modified HTML content
          const cssPath = path.resolve(__dirname, '../templates/bootstrap.min.css');
          
          await page.setContent(modifiedHTML, { waitUntil: 'networkidle0' });

          await page.addStyleTag({ path: cssPath });

          // Generate PDF
          await page.pdf({ path: `./storage/dcCertificate/${updateItemDc.dcNo}.pdf`, format: 'A4' });

          await browser.close();

          console.log('PDF created successfully');
        }

        if (!updateItemDc) {
          return res.status(404).json({ error: 'Item Dc not found' });
        }
        console.log("Item Dc Updated Successfully")
        res.status(200).json({ result: "updateItemDc", message: "Item Dc Updated Successfully" });
      } else {
        res.status(500).json({ error: 'Item cannot be deleted, used in GRN' });
      }


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
  deleteItemDc: async (req, res) => {
    try {
      const { itemDcIds } = req.body;
      console.log(req.body);

      const deleteResults = [];

      await Promise.all(itemDcIds.map(async (itemDcId) => {
        const dcData = await itemDcModel.findById(itemDcId);
        const grnData = await itemGRNModel.findOne({ grnItemDcNo: dcData.dcNo });
        console.log(grnData)

        if (!grnData) {
          if (dcData.dcPartyItems.length !== 0) {
            const updatePromises = dcData.dcPartyItems.map(async (item) => {
              const itemData = await itemAddModel.findById(item._id);
              if (!itemData) {
                throw new Error(`Item Data not found for item with ID: ${item._id}`);
              }
              const { itemIMTENo, itemCurrentLocation, itemLastLocation } = itemData;
              const updateItemFields = {
                itemIMTENo,
                itemCurrentLocation: itemLastLocation,
                itemLastLocation: itemCurrentLocation,
                itemLocation: "department",
                dcId: "",
                dcStatus: "0",
                dcCreatedOn: "",
                dcNo: "",
              };
              return itemAddModel.findByIdAndUpdate(item._id, { $set: updateItemFields }, { new: true });
            });
            const updatedItems = await Promise.all(updatePromises);
            console.log("Updated items:", updatedItems);
          }
          const deletedItemDc = await itemDcModel.findByIdAndDelete(itemDcId);
          if (!deletedItemDc) {
            throw new Error(`Item Dc with ID ${itemDcId} not deleted.`);
          }
          console.log(`Item Dc with ID ${itemDcId} deleted successfully.`);
          deleteResults.push(deletedItemDc);
        } else {
          throw new Error('DC cannot be deleted, used in GRN');
        }
      }));

      res.status(202).json({
        message: 'Item Dc(s) deleted successfully',
        results: `${deleteResults.length} Item Dc(s) Deleted Successfully`,
        deletedItems: deleteResults,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  },


  getItemDcById: async (req, res) => {
    try {
      const itemDcId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getItemDcById = await itemDcModel.findOne(
        { _id: itemDcId }// To return the updated document
      );

      if (!getItemDcById) {
        return res.status(404).json({ error: 'Item Dc not found' });
      }
      console.log("Item Dc Get Successfully")
      res.status(200).json({ result: getItemDcById, message: "Item Dc get Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
    }
  }

}


module.exports = itemDcController;