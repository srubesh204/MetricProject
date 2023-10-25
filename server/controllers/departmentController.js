const departmentModel = require("../models/departmentModel")

const departmentControllers = {
    getAllDepartment: async (req, res) => {
        try {
          const departmentResult = await departmentModel.find();
          res.status(200).json(departmentResult);
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Department');
        }
      },
      createDepartment: async (req, res) => {
       
        try {
          const { department, area, placeOfUsage } = req.body;
          if (!department) {
            return res.status(200).json({ message: "Department Should not be empty", status: 0 });
          }
          const departmentResult = new departmentModel({ department, area, placeOfUsage });
          await departmentResult.save();
          res.status(200).json({message: "Department Data Successfully Saved",status: 1});
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: 'Internal server error on Department',status: 0});
        }
      },
      updateDepartment: async (req, res) => {
        try {
          const depId = req.params.id; // Assuming desId is part of the URL parameter
          // if (isNaN(desId)) {
          //   return res.status(400).json({ error: 'Invalid desId value' });
          // }
      
          // Create an object with the fields you want to update
          const updateDepFields = {
            /* Specify the fields and their updated values here */
            department: req.body.department, area : req.body.area, placeOfUsage : req.body.placeOfUsage, // Example: updating the 'name' field
            // Add more fields as needed
          };
      
          // Find the designation by desId and update it
          const updateDepartment = await departmentModel.findOneAndUpdate(
            {_id : depId},
            updateDepFields,
            { new: true } // To return the updated document
          );
      
          if (!updateDepartment) {
            return res.status(404).json({ error: 'Department not found' });
          }
      
          res.status(200).json(updateDepartment);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      deleteDepartment : async (req, res) => {
        try {
          const depId = req.params.id; // Assuming id is part of the URL parameter
      
          // Find the designation by _id and remove it
          const deleteDepartment = await departmentModel.findOneAndRemove(
            { _id: depId } // Pass the _id as an object
          );
      
          if (!deleteDepartment) {
            return res.status(404).json({ error: 'Department not found' });
          }
      
          res.status(200).json({ message: 'Department deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      }


module.exports = departmentControllers;