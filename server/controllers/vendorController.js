const vendorModel = require("../models/vendorModel")

const vendorController = {
    getAllVendors: async (req, res) => {
        try {
            const vendorResult = await vendorModel.find();
            res.status(200).json(vendorResult);
            //res.status(200).json(employees);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error on Vendor Data');
        }
    },
    createVendor: async (req, res) => {

        try {
            const { vendorCode, aliasName, fullName, dor, address, state, city, oem, customer, supplier, subcontractor, certificate, certifacteValidity, vendorContacts} = req.body;
           
            const vendorResult = new vendorModel({ vendorCode, aliasName, fullName, dor, address, state, city, oem, customer, supplier, subcontractor, certificate, certifacteValidity, vendorContacts });
            await vendorResult.save();
            res.status(200).json({ message: "Vendor Data Successfully Saved", status: 1 });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server error on Vendor', status: 0 });
        }
    },
    updateVendor: async (req, res) => {
        try {
            const vendorId = req.params.id; // Assuming desId is part of the URL parameter
            // if (isNaN(desId)) {
            //   return res.status(400).json({ error: 'Invalid desId value' });
            // }

            // Create an object with the fields you want to update
            const { vendorCode, aliasName, fullName, dor, address, state, city, oem, customer, supplier, subcontractor, certificate, certifacteValidity, vendorContacts } = req.body;

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
              subcontractor,
              certificate,
              certifacteValidity,
              vendorContacts

                // Add more fields as needed
            };


            // Find the designation by desId and update it
            const updateVendor = await vendorModel.findOneAndUpdate(
                { _id: vendorId },
                updateVendorFields,
                { new: true } // To return the updated document
            );

            if (!updateVendor) {
                return res.status(404).json({ error: 'Vendor not found' });
            }

            res.status(200).json(updateVendor);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    deleteVendor: async (req, res) => {
        try {
            const vendorId = req.params.id; // Assuming id is part of the URL parameter

            // Find the designation by _id and remove it
            const deleteVendor = await vendorModel.findOneAndRemove(
                { _id: vendorId } // Pass the _id as an object
            );

            if (!deleteVendor) {
                return res.status(404).json({ error: 'Vendor not found' });
            }

            res.status(200).json({ message: 'Vendor Data deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
}


module.exports = vendorController;