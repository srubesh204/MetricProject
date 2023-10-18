const designationModel = require("../models/designationModel")

const designationController = {
    getAllDesignation: async (req, res) => {
        try {
          const designationResult = await designationModel.find();
          res.status(200).json({result :designationResult, status: 1});
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Designation');
        }
      },
      createDesignation: async (req, res) => {
       
        try {
          const { designation } = req.body;
         
          const designationResult = new designationModel({          
            designation: designation
            // Other fields in your document
          });
          await designationResult.save();
          res.status(201).json({result :designationResult, status: 1});
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: 'Internal server error on Designation' , status: 0});
        }
      },
      updateDesignation: async (req, res) => {
        try {
          const desId = req.params.id; // Assuming desId is part of the URL parameter
          // if (isNaN(desId)) {
          //   return res.status(400).json({ error: 'Invalid desId value' });
          // }
      
          // Create an object with the fields you want to update
          const updateDesFields = {
            /* Specify the fields and their updated values here */
            designation: req.body.designation, // Example: updating the 'name' field
            // Add more fields as needed
          };
      
          // Find the designation by desId and update it
          const updatedDesignation = await designationModel.findOneAndUpdate(
            {_id : desId},
            updateDesFields,
            { new: true } // To return the updated document
          );
      
          if (!updatedDesignation) {
            return res.status(404).json({ error: 'Designation not found' });
          }
      
          res.status(200).json(updatedDesignation);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      deleteDesignation : async (req, res) => {
        try {
          const desId = req.params.id; // Assuming id is part of the URL parameter
      
          // Find the designation by _id and remove it
          const deletedDesignation = await designationModel.findOneAndRemove(
            { _id: desId } // Pass the _id as an object
          );
      
          if (!deletedDesignation) {
            return res.status(404).json({ error: 'Designation not found' });
          }
      
          res.status(200).json({ message: 'Designation deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      }
      }
module.exports = designationController;