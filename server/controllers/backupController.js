const backupModel = require("../models/backupModel")
const { exec } = require('child_process');
const fsExtra = require('fs-extra');
const dayjs = require('dayjs')
const path = require('path');
const backupController = {



  updateBackUp: async (req, res) => {
    try {
      const backUpId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      //   return res.status(400).json({ error: 'Invalid desId value' });
      // }

      // Create an object with the fields you want to update
      const updateBackUpFields = {
        /* Specify the fields and their updated values here */
        path: req.body.path, date: req.body.date, time: req.body.time, backupName: req.body.backupName,// Example: updating the 'name' field
        // Add more fields as needed
      };

      // Find the designation by desId and update it
      const backupUpdate = new backupModel(updateBackUpFields);

      const validationError = backupUpdate.validateSync();
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
      const updateBackUp = await backupModel.findOneAndUpdate(
        { backId: backUpId },
        updateBackUpFields,
        { new: true, upsert: true } // To return the updated document
      );

      if (!updateBackUp) {
        return res.status(404).json({ error: 'Back Up not found' });
      }
      console.log("Back Up Updated Successfully")
      res.status(200).json({ result: updateBackUp, message: "Back Up Updated Successfully" });
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
 
  getBackUpById: async (req, res) => {
    try {
      const backUpId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getBackUpById = await backupModel.findOne(
        { backId: backUpId }// To return the updated document
      );

      if (!getBackUpById) {
        return res.status(404).json({ error: 'Back Up not found' });
      }
      console.log("Back Up Get Successfully")
      res.status(200).json({ result: getBackUpById, message: "back get Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
    }
  },
  backUpDb: async (req, res) => {
    try {
      const { backUpPath } = req.body;
      const command = `mongodump --uri="mongodb://localhost:27017" --out "${backUpPath}"`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return res.status(500).json({ message: `exec error: ${error}` });
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });

      const srcDir = path.join(__dirname, '..', 'storage');
      const destDir = path.join(backUpPath, 'storage');

      // Copy source directory to destination directory
      await fsExtra.copy(srcDir, destDir);

      const updateBackUp = await backupModel.findOneAndUpdate(
        { backId: "backId" },
        { $set: { date: dayjs().format("DD-MM-YYYY") } },
        { new: true, upsert: true } // To return the updated document
      );

      res.status(200).json({ result: updateBackUp, message: "Backup created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  restoreDB: async (req, res) => {
    try {
      const { backUpPath } = req.body;
      const command = `mongorestore --uri="mongodb://localhost:27017" "${backUpPath}"`;
  
      // Wrap exec in a Promise
      const execPromise = new Promise((resolve, reject) => {
        exec(command, { maxBuffer: 1024 * 1024 * 5 }, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            reject(error);
          } else {
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            resolve();
          }
        });
      });
  
      // Wait for exec to finish
      await execPromise;
  
      const srcDir = path.join(__dirname, '..', '..', "restore");
      const destDir = path.join(__dirname, '..', 'storage');
  
      // Copy backup directory to source directory
      await fsExtra.copy(srcDir, destDir);
  
      const updateBackUp = await backupModel.findOneAndUpdate(
        { backId: "backId" },
        { $set: { restoreDate: dayjs().format("DD-MM-YYYY") } },
        { new: true, upsert: true } // To return the updated document
      );
  
      res.status(200).json({ result: updateBackUp, message: "Restore successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }


}


module.exports = backupController; 