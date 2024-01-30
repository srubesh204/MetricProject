const { plantSchema } = require("../models/compDetailsModel");
const employeeModel = require("../models/employeeModel");

const plantDetailsController = {
    getAllPlantDetails: async (req, res) => {
        try {
            const plantResults = await plantSchema.find();
            res.status(202).json({ result: plantResults, status: 1 });
            //res.status(200).json(employees);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error on Company Plants Details');
        }
    },
    createPlantDetails: async (req, res) => {

        try {
            const { plantName, plantAddress } = req.body;
            const plantResults = new plantSchema({ plantName, plantAddress});
            const validationError = plantResults.validateSync();

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
            await plantResults.save();
            return res.status(200).json({ message: "Company Plants Details Successfully Saved", status: 1 });
        } catch (error) {
            console.log(error)
            if (error.errors) {
                const errors500 = {};
                for (const key in error.errors) {
                    errors500[key] = error.errors[key].message;
                }
                return res.status(500).json({ error: errors500, status: 0 });
            }

            return res.status(500).json({ error: 'Internal server error on Company Plants Details', status: 0 });
        }
    },

    updatePlantDetails: async (req, res) => {
        try {
            const plantDetailsId = req.params.id; // Assuming desId is part of the URL parameter
           
            const updatePlantDetailsFields = { plantName, plantAddress } = req.body;

            // Find the designation by desId and update it
            const plantDetailsUpdate = new plantSchema(updatePlantDetailsFields);

            const validationError = plantDetailsUpdate.validateSync();

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
            const updatePlantDetails = await plantSchema.findOneAndUpdate(
                { _id: plantDetailsId },
                updatePlantDetailsFields,
                { new: true } // To return the updated document
            );

            

            if (!updatePlantDetails) {
                return res.status(404).json({ error: 'Company Plants Details not found' });
            }
            console.log("Company Plants Details Updated Successfully")
            res.status(200).json({ result: updatePlantDetails, message: "Company Plants Details Updated Successfully" });
        } catch (error) {
            console.log(error);
            if (error.code === 11000) {
                return res.status(500).json({ error: 'Same Plant Not Allowed' });
            }
            const errors500 = {};
            for (const key in error.errors) {
                errors500[key] = error.errors[key].message;
            }
            res.status(500).json({ error: error, status: 0 });
            
        }
    },
    deletePlantDetails: async (req, res) => {
        try {

            const plantDetailsId = req.params.id; // Assuming an array of vendor IDs is sent in the request body
            console.log(req.body)
            
            const deletedPlantDetails = await plantSchema.findOneAndRemove({ _id: plantDetailsId });
            

            return res.status(202).json({ message: 'Company Plants Details deleted successfully', results: `Company Plants Details Deleted Successfull ` });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    getPlantDetailsById: async (req, res) => {
        try {
            const plantDetailsId = req.params.id; // Assuming desId is part of the URL parameter
            // if (isNaN(desId)) {
            // Find the designation by desId and update it
            const getPlantDetailsById = await plantSchema.findOne(
                { _id: plantDetailsId }// To return the updated document
            );

            if (!getPlantDetailsById) {
                return res.status(404).json({ error: 'Company Plants Details not found' });
            }
            console.log("Company Plants Details Get Successfully")
            res.status(200).json({ result: getPlantDetailsById, message: "Company Plants Details get Successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error, status: 0 });
        }
    }
}


module.exports = plantDetailsController; 