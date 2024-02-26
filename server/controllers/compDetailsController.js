const { compDetailsSchema } = require("../models/compDetailsModel")

const compDetailsController = {
  getAllCompDetails: async (req, res) => {
    try {
      const compDetailsResult = await compDetailsSchema.find();
      res.status(202).json({ result: compDetailsResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Company Details');
    }
  },
  

  updateCompDetails: async (req, res) => {
    try {
      const compDetailsId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      //   return res.status(400).json({ error: 'Invalid desId value' });
      // }

      // Create an object with the fields you want to update
      const updateCompDetailsFields = {
        /* Specify the fields and their updated values here */
        userType: req.body.userType, 
        companyName: req.body.companyName, 
        companyAddress: req.body.companyAddress, 
        companyPlants: req.body.companyPlants, 
        companyLogo: req.body.companyLogo, 
        companyImage: req.body.companyImage,
        uncertaintyPage: req.body.uncertaintyPage,
        gaugeSpacePage: req.body.gaugeSpacePage,
        stickerPrintPage: req.body.stickerPrintPage,
        // Example: updating the 'name' field
        // Add more fields as needed
      };

      // Find the designation by desId and update it
      const compDetailsUpdate = new compDetailsSchema(updateCompDetailsFields);

      const validationError = compDetailsUpdate.validateSync();
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
      const updateCompDetails = await compDetailsSchema.findOneAndUpdate(
        { _id: compDetailsId },
        updateCompDetailsFields,
        { new: true, upsert: true } // To return the updated document
      );

      if (!updateCompDetails) {
        return res.status(404).json({ error: 'Company Details not found' });
      }
      console.log("Company Details Updated Successfully")
      res.status(200).json({ result: updateCompDetails, message: "Company Details Updated Successfully" });
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
  deleteCompDetails: async (req, res) => {
    try {

      const { compDetailsIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
      console.log(req.body)
      const deleteResults = [];

      for (const compDetailsId of compDetailsIds) {
        // Find and remove each vendor by _id
        const deletedCompDetails = await compDetailsSchema.findOneAndRemove({ _id: compDetailsId });
        console.log(deletedCompDetails)
        if (!deletedCompDetails) {
          // If a vendor was not found, you can skip it or handle the error as needed.
          console.log(`Company Details with ID ${compDetailsId} not found.`);
          res.status(500).json({ message: `Company Details not found.` });

        } else {
          console.log(`Company Details with ID ${compDetailsId} deleted successfully.`);
          deleteResults.push(deletedCompDetails);
        }
      }

      return res.status(202).json({ message: 'Company Details deleted successfully', results: `${deleteResults.length} Company Details Deleted Successfull ` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getCompDetailsById: async (req, res) => {
    try {
      const compDetailsId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      // Find the designation by desId and update it
      const getCompDetailsById = await compDetailsSchema.findById(compDetailsId);

      if (!getCompDetailsById) {
        return res.status(404).json({ error: 'Company Details not found' });
      }
      console.log("Company Details Get Successfully")
      res.status(200).json({ result: getCompDetailsById, message: "Company Details get Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, status: 0 });
    }
  }
}


module.exports = compDetailsController; 