const partModel = require("../models/partModel")

const partController = {
    getAllParts: async (req, res) => {
        try {
            const partResult = await partModel.find();
            res.status(200).json(partResult);
            //res.status(200).json(employees);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error on Part Data');
        }
    },
    createPart: async (req, res) => {

        try {
            const { partNo, partName, customer, operationNo } = req.body;
          
            const partResult = new partModel({ partNo, partName, customer, operationNo });
            await partResult.save();
            res.status(200).json({ message: "Part Data Successfully Saved", status: 1 });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server error on Part', status: 0 });
        }
    },
    updatePart: async (req, res) => {
        try {
            const partId = req.params.id; // Assuming desId is part of the URL parameter
            // if (isNaN(desId)) {
            //   return res.status(400).json({ error: 'Invalid desId value' });
            // }

            // Create an object with the fields you want to update
            const { partNo, partName, customer, operationNo } = req.body;

            const updatePartFields = {
                partNo,
                partName,
                customer,
                operationNo,
                // Add more fields as needed
            };


            // Find the designation by desId and update it
            const updatePart = await partModel.findOneAndUpdate(
                { _id: partId },
                updatePartFields,
                { new: true } // To return the updated document
            );

            if (!updatePart) {
                return res.status(404).json({ error: 'Unit not found' });
            }

            res.status(200).json(updatePart);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    deletePart: async (req, res) => {
        try {
            const partId = req.params.id; // Assuming id is part of the URL parameter

            // Find the designation by _id and remove it
            const deletePart = await partModel.findOneAndRemove(
                { _id: partId } // Pass the _id as an object
            );

            if (!deletePart) {
                return res.status(404).json({ error: 'Unit not found' });
            }

            res.status(200).json({ message: 'Part Data deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
}


module.exports = partController;