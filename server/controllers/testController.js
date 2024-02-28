const dayjs = require("dayjs");
const itemAddModel = require("../models/itemAddModel");
const testModel = require("../models/testModel")
const excelToJson = require('convert-excel-to-json');


const testController = {
    getAllTest: async (req, res) => {
        try {
            const TestResult = await testModel.find();
            res.status(202).json({ result: TestResult, status: 1, message: "Test Get Successfull" });
            //res.status(200).json(employees);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error on Test');
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
              D: 'itemImage',
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
              Z: 'itemCalDate',
              AA: 'itemDueDate',
              AB: 'itemCalibratedAt',
              AC: 'itemCertificateNo',
              AD: 'itemCertificateName',
              AE: 'itemUncertainty',
              AF: 'itemUncertaintyUnit',
              AG: 'itemPlant'
    
    
          }
          });
          console.log(jsonData)

          const modifiedData = jsonData.Sheet1.map(item => {
            item.itemCalDate = dayjs(item.itemCalDate).format("YYYY-MM-DD")
            item.itemDueDate = dayjs(item.itemDueDate).format("YYYY-MM-DD")
            item.itemReceiptDate = dayjs(item.itemReceiptDate).format("YYYY-MM-DD")
            item.itemLocation = item.itemLocation ?  item.itemLocation.toLowerCase() : "department"
            item.itemStatus = item.itemStatus ? item.itemStatus.toLowerCase() : "active"
           
            
            return item;
          });
      
          const uploadPromises = modifiedData.map(async (item) => {
            try {
              // Create an instance of designationModel and save it to the database
              const newItemAdd = new testModel(item); // Assuming 'item' conforms to your ItemAddModel schema
              const savedItemAdd = await newItemAdd.save();
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
    ,
    changeDate: async (req, res) => {
        try {
          // Fetch all documents in the collection
          const allDocuments = await itemAddModel.find();
      
          // Iterate through each document and update the "area" field with its previous value
          const updatePromises = allDocuments.map(async (existingDocument) => {
            const prevCalDate = dayjs(existingDocument.itemCalDate).format("YYYY-MM-DD");
            const itemDueDate = dayjs(existingDocument.itemDueDate).format("YYYY-MM-DD");
            const itemReceiptDate = dayjs(existingDocument.itemReceiptDate).format("YYYY-MM-DD");
            existingDocument.itemCalDate = prevCalDate;
            existingDocument.itemDueDate = itemDueDate;
            existingDocument.itemReceiptDate = itemReceiptDate;
            // Optionally, update other properties based on your logic
            // existingDocument.someOtherField = someNewValue;
            return existingDocument.save();
          });
      
          // Wait for all updates to complete
          const updatedResults = await Promise.all(updatePromises);
      
          res.status(202).json({ result: updatedResults, status: 1, message: "All areas updated with previous values successfully" });
        } catch (err) {
          console.error(err);
          res.status(500).send('Error updating areas');
        }
      }
}



module.exports = testController;