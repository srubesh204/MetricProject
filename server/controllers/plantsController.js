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
            const { plantName, plantAddress, employees } = req.body;
            const plantResults = new plantSchema({ plantName, plantAddress, employees });
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

            // const plantEmployees = [...new Set([...admins, ...plantAdmins, ...creators, ...viewers])];


            // const updatePromises = plantEmployees.map(async (empId) => {

            //     const employeeData = await employeeModel.findById(empId)
            //     console.log(employeeData)
            //     const updatedEmployeeData = { employeeData, plant: [plantName] }
            //     console.log(updatedEmployeeData)

            //     const updateResult = await employeeModel.findOneAndUpdate(
            //         { _id: employeeData._id },
            //         { $set: updatedEmployeeData },
            //         { new: true }
            //     );

            //     return updateResult;
            // });
            // const updatedItems = await Promise.all(updatePromises);

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
            // if (isNaN(desId)) {
            //   return res.status(400).json({ error: 'Invalid desId value' });
            // }

            // Create an object with the fields you want to update
            const updatePlantDetailsFields = { plantName, plantAddress, admins, plantAdmins, creators, viewers } = req.body;

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

            const plantEmployees = [...new Set([...admins, ...plantAdmins, ...creators, ...viewers])];

            const allEmployees = await employeeModel.find();
            
            allEmployees.forEach(async (employee) => {
                // Check if the plantName is in the plant array
                if (employee.plant.includes(plantName)) {
                    await employeeModel.findByIdAndUpdate(
                        employee._id,
                        { $pull: { plant: plantName } }
                    );
                    console.log(`Plant ${plantName} removed from employee with ID ${employee._id}`);
                } else {
                    console.log(`Employee with ID ${employee._id} doesn't have plant ${plantName}`);
                }
            });

            const updatePromises = plantEmployees.map(async (empId) => {
                const employeeData = await employeeModel.findById(empId);
            
                // Check if the plantName is already in the plant array
                if (!employeeData.plant.includes(plantName)) {
                    const updateResult = await employeeModel.findByIdAndUpdate(
                        empId,
                        { $addToSet: { plant: plantName } },
                        { new: true }
                    );
            
                    console.log(updateResult);
                    return updateResult;
                } else {
                    // If the plantName is already present, return the existing employee data
                    return employeeData;
                }
            });
            
            const updatedItems = await Promise.all(updatePromises);

            if (!updatePlantDetails) {
                return res.status(404).json({ error: 'Company Plants Details not found' });
            }
            console.log("Company Plants Details Updated Successfully")
            res.status(200).json({ result: updatePlantDetails, message: "Company Plants Details Updated Successfully" });
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
    deletePlantDetails: async (req, res) => {
        try {

            const { plantDetailsIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
            console.log(req.body)
            const deleteResults = [];

            for (const plantDetailsId of plantDetailsIds) {
                // Find and remove each vendor by _id
                const deletedPlantDetails = await plantSchema.findOneAndRemove({ _id: plantDetailsId });
                console.log(deletedPlantDetails)
                if (!deletedPlantDetails) {
                    // If a vendor was not found, you can skip it or handle the error as needed.
                    console.log(`Company Plants Details with ID ${plantDetailsId} not found.`);
                    res.status(500).json({ message: `Company Plants Details not found.` });

                } else {
                    console.log(`Company Plants Details with ID ${plantDetailsId} deleted successfully.`);
                    deleteResults.push(deletedPlantDetails);
                }
            }

            return res.status(202).json({ message: 'Company Plants Details deleted successfully', results: `${deleteResults.length} Company Plants Details Deleted Successfull ` });
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