const dayjs = require("dayjs");
const itemAddModel = require("../models/itemAddModel");
const testModel = require("../models/testModel")
const excelToJson = require('convert-excel-to-json');


const areaController = {
    getAllAreas: async (req, res) => {
        try {
            const TestResult = await testModel.find();
            res.status(202).json({ result: TestResult, status: 1, message: "Test Get Successfull" });
            //res.status(200).json(employees);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error on Test');
        }
    },
    
    uploadTestData: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const excelData = req.file.buffer; // Access the file buffer

            // Convert Excel data to JSON
            const jsonData = excelToJson({
                source: excelData,
                columnToKey: {
                    A: "albumId",
                    B: "id",
                    C: "title",
                    D: "url",
                    E: "thumbnailUrl"
                }
            });
            console.log(jsonData)

            const uploadPromises = jsonData.Sheet1.map(async (item) => {
                try {
                    // Create an instance of testModel and save it to the database
                    const test = new testModel(item); // Assuming 'item' conforms to your testModel schema
                    const testSavedData = await test.save();
                    return testSavedData;

                } catch (error) {
                    console.error('Error saving designation:', error);
                    
                }
            });

            // Execute all upload promises
            const uploadedTest = await Promise.all(uploadPromises);

            res.status(200).json({ uploadedTest, message: 'Excel data uploaded successfully' });
        } catch (error) {
            console.error('Error uploading Excel data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
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



module.exports = areaController;