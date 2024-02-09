const vendorModel = require("../models/vendorModel")
const excelToJson = require('convert-excel-to-json');

const vendorController = {
  getAllVendors: async (req, res) => {
    try {
      const vendorResult = await vendorModel.find();
      res.status(202).json({ result: vendorResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Vendor Data');
    }
  },

  getVendorByPlants: async (req, res) => {
    const { allowedPlants } = req.body
    try {

      const vendorByPlant = await vendorModel.aggregate([
        {
          $match: {
            "vendorPlant": { $in: allowedPlants ? allowedPlants : [] } // Specify the values to match
          }
        }
      ])
      res.status(202).json({ result: vendorByPlant, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Vendor Data');
    }
  },

  createVendor: async (req, res) => {

    try {
      const { vendorCode, aliasName, fullName, dor, address, state, city, oem, customer, supplier, subContractor, certificate, certificateValidity, vendorStatus, vendorContacts, vendorPlant } = req.body;

      const vendorResult = new vendorModel({ vendorCode, aliasName, fullName, dor, address, state, city, oem, customer, supplier, subContractor, certificate, certificateValidity, vendorStatus, vendorContacts, vendorPlant });

      const validationError = vendorResult.validateSync();

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

      await vendorResult.save();
      return res.status(200).json({ message: "Vendor Data Successfully Saved", status: 1 });
    } catch (error) {
      console.log(error)
      if (error.errors) {
        const errors500 = {};
        for (const key in error.errors) {
          errors500[key] = error.errors[key].message;
        }
        return res.status(500).json({ error: errors500, status: 0 });
      }

      return res.status(500).json({ error: 'Internal server error on Vendor', status: 0 });
    }
  },
  updateVendor: async (req, res) => {
    try {
      const vendorId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      //   return res.status(400).json({ error: 'Invalid desId value' });
      // }

      // Create an object with the fields you want to update
      const { vendorCode, aliasName, fullName, dor, address, state, city, oem, customer, supplier, subContractor, certificate, certificateValidity, vendorStatus, vendorContacts, vendorPlant } = req.body;

      const updateVendorFields = {
        vendorCode,
        aliasName,
        fullName,
        dor,
        address,
        state,
        city,
        oem,
        customer,
        supplier,
        subContractor,
        certificate,
        certificateValidity,
        vendorStatus,
        vendorContacts,
        vendorPlant
        // Add more fields as needed
      };


      // Find the designation by desId and update it
      const vendorUpdate = new vendorModel(updateVendorFields);

      const validationError = vendorUpdate.validateSync();
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
      const updateVendor = await vendorModel.findOneAndUpdate(
        { _id: vendorId },
        updateVendorFields,
        { new: true } // To return the updated document
      );

      if (!updateVendor) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
      console.log("Vendor Updated Successfully")
      res.status(200).json({ result: updateVendor, message: "Vendor Updated Successfully" });
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
  // Express route to delete multiple vendors
  deleteVendor: async (req, res) => {
    try {

      const { vendorIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = [];

      for (const vendorId of vendorIds) {
        // Find and remove each vendor by _id
        const deletedVendor = await vendorModel.findOneAndRemove({ _id: vendorId });
        console.log(deletedVendor)
        if (!deletedVendor) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`Vendor with ID ${vendorId} not found.`);
          res.status(500).json({ message: `Vendor with ID not found.` });

        } else {
          console.log(`Vendor with ID ${vendorId} deleted successfully.`);
          deleteResults.push(deletedVendor);
        }
      }

      return res.status(202).json({ message: 'Vendors deleted successfully', results: `${deleteResults.length} Vendors Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getVendorById: async (req, res) => {
    try {
      const vendorId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getVendorById = await vendorModel.findOne(
        { _id: vendorId }// To return the updated document
      );

      if (!getVendorById) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
      console.log("Vendor Get Successfully")
      res.status(200).json({ result: getVendorById, message: "Vendor get Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
    }
  },
  getAllVendorWithTypes: async (req, res) => {
    try {
      const fetchAllVendors = async () => {
        return await vendorModel.find({});
      };
      const fetchVendor = async (category) => {
        return await vendorModel.find({ [category]: "1" });
      };

      const [allVendors, customers, subContractors, suppliers, oems] = await Promise.all([
        fetchAllVendors(),
        fetchVendor('customer'),
        fetchVendor('subContractor'),
        fetchVendor('supplier'),
        fetchVendor('oem'),
      ]);

      res.status(202).json({
        result: { allVendors, customers, subContractors, suppliers, oems },
        status: 1,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on VendorSegragation Data');
    }
  },

  uploadVendorInExcel: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const excelData = req.file.buffer; // Access the file buffer

      // Convert Excel data to JSON
      const jsonData = excelToJson({
        source: excelData,
        header: {
          rows: 1
        },
        columnToKey: {
          A: 'vendorCode',
          B: 'aliasName',
          C: 'fullName',
          D: 'dor',
          E: 'address',
          F: 'state',
          G: 'city',
          H: 'oem',
          I: 'customer',
          J: 'supplier',
          K: 'subContractor',
          L: 'certificate',
          M: 'certificateValidity',
          N: 'vendorStatus'
        }
      });
      console.log(jsonData)

      const uploadPromises = jsonData.Sheet1.map(async (item) => {
        try {
          // Create an instance of designationModel and save it to the database
          const newVendor = new vendorModel(item); // Assuming 'item' conforms to your designationModel schema
          const savedVendor = await newVendor.save();
          return savedVendor;

        } catch (error) {
          console.error('Error saving vendor:', error);

        }
      });

      // Execute all upload promises
      const uploadedVendor = await Promise.all(uploadPromises);

      res.status(200).json({ uploadedVendor, message: 'Uploaded successfully' });
    } catch (error) {
      console.error('Error uploading Excel data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }



}



module.exports = vendorController;