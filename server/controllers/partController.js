const partModel = require("../models/partModel")

const partController = {
    getAllParts: async (req, res) => {
        try {
            const partResult = await partModel.find();
            res.status(202).json({ result: partResult, status: 1 });
            //res.status(200).json(employees);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error on Part Data');
        }
    },
    createPart: async (req, res) => {

        try {
            const { partNo, partName, customer, operationNo, partStatus } = req.body;

            const partResult = new partModel({ partNo, partName, customer, operationNo, partStatus });
            const validationError = partResult.validateSync();

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

            await partResult.save();
            return res.status(200).json({ message: "Part  Successfully Saved", status: 1 });
        } catch (error) {
            console.log(error)
            if (error.errors) {
                const errors500 = {};
                for (const key in error.errors) {
                    errors500[key] = error.errors[key].message;
                }
                return res.status(500).json({ error: errors500, status: 0 });
            }

            return res.status(500).json({ error: 'Internal server error on Part', status: 0 });
        }
    },
    updatePart: async (req, res) => {
        try {
            const partId = req.params.id; // Assuming desId is part of the URL parameter
            // if (isNaN(desId)) {
            //   return res.status(400).json({ error: 'Invalid desId value' });
            // }

            // Create an object with the fields you want to update
            const { partNo, partName, customer, operationNo, partStatus } = req.body;

            const updatePartFields = {
                partNo,
                partName,
                customer,
                operationNo,
                partStatus
                // Add more fields as needed
            };
            const partUpdate = new partModel(updatePartFields);

            const validationError = partUpdate.validateSync();
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
            const updatePart = await partModel.findOneAndUpdate(
                { _id: partId },
                updatePartFields,
                { new: true } // To return the updated document
            );

            if (!updatePart) {
                return res.status(404).json({ error: 'Part not found' });
            }
            console.log("Part Updated Successfully")
            res.status(200).json({ result: updatePart, message: "Part Updated Successfully" });
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
    deletePart: async (req, res) => {
        try {
            const partId = req.params.id; // Assuming id is part of the URL parameter

            // Find the designation by _id and remove it
            const deletePart = await partModel.findOneAndRemove(
                { _id: partId } // Pass the _id as an object
            );

            if (!deletePart) {
                return res.status(404).json({ error: 'Part not found' });
            }
            console.log("Part Deleted Successfully")
            res.status(202).json({ message: 'Part deleted successfully' ,result: deletePart });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}


module.exports = partController;