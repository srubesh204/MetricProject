const unitModel = require("../models/unitModel")

const unitController = {
    getAllUnits: async (req, res) => {
        try {
          const unitResult = await unitModel.find();
          res.status(200).json(unitResult);
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Unit');
        }
      },
      createUnit: async (req, res) => {
       
        try {
          const { unitName } = req.body;
          if (!unitName) {
            return res.status(400).json({ error: 'All fields must be provided' });
          }
          const unitResult = new unitModel({ unitName});
          await unitResult.save();
          res.status(200).json({message: "Unit Data Successfully Saved",status: 1});
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: 'Internal server error on Unit',status: 0});
        }
      },
      updateUnit: async (req, res) => {
        try {
          const unitId = req.params.id; // Assuming desId is part of the URL parameter
          // if (isNaN(desId)) {
          //   return res.status(400).json({ error: 'Invalid desId value' });
          // }
      
          // Create an object with the fields you want to update
          const updateUnitFields = {
            /* Specify the fields and their updated values here */
            unitName: req.body.unitName,  // Example: updating the 'name' field
            // Add more fields as needed
          };
      
          // Find the designation by desId and update it
          const updateUnit = await unitModel.findOneAndUpdate(
            {_id : unitId},
            updateUnitFields,
            { new: true } // To return the updated document
          );
      
          if (!updateUnit) {
            return res.status(404).json({ error: 'Unit not found' });
          }
      
          res.status(200).json(updateUnit);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      deleteUnit : async (req, res) => {
        try {
          const unitId = req.params.id; // Assuming id is part of the URL parameter
      
          // Find the designation by _id and remove it
          const deleteUnit = await unitModel.findOneAndRemove(
            { _id: unitId } // Pass the _id as an object
          );
      
          if (!deleteUnit) {
            return res.status(404).json({ error: 'Unit not found' });
          }
      
          res.status(200).json({ message: 'Unit deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      }


module.exports = unitController;