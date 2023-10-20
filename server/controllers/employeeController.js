const employeeModel = require("../models/employeeModel")

const employeeController = {
    getAllEmployee: async (req, res) => {
        try {
          const employeeResult = await employeeModel.find();
          res.status(202).json({result :employeeResult, status: 1});
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Employee');
        }
      },
      createEmployee: async (req, res) => {
       
        try {
          const { employeeCode, title, firstName, lastName, dob, address, city, state, contactNumber, designation, department, maidId, doj, employmentStatus, reportTo} = req.body;
          const employeeResult = new employeeModel({ employeeCode, title, firstName, lastName, dob, address, city, state, contactNumber, designation, department, maidId, doj, employmentStatus, reportTo });
          await employeeResult.save();
          res.status(202).json({result :employeeResult, status: 1});
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: 'Internal server error on Employee' , status: 0});
        }
      },
      updateEmployee: async (req, res) => {
        try {
          const empId = req.params.id; // Assuming desId is part of the URL parameter
          // if (isNaN(desId)) {
          //   return res.status(400).json({ error: 'Invalid desId value' });
          // }
      
          // Create an object with the fields you want to update
          const updateEmpFields = {
            /* Specify the fields and their updated values here */
            empCode: req.body.empCode, title : req.body.title, firstName : req.body.firstName, lastName : req.body.lastName, dob : req.body.dob, address : req.body.address, city : req.body.city, state : req.body.state, contactNumber : req.body.contactNumber, designation : req.body.designation, department : req.body.department, mailId : req.body.mailId, doj : req.body.doj, employmentStatus : req.body.employmentStatus, reportTo : req.body.reportTo // Example: updating the 'name' field
            // Add more fields as needed
          };
      
          // Find the designation by desId and update it
          const updateEmployee = await employeeModel.findOneAndUpdate(
            {_id : empId},
            updateEmpFields,
            { new: true } // To return the updated document
          );
      
          if (!updateEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
          }
      
          res.status(200).json(updateEmployee);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      deleteEmployee : async (req, res) => {
        try {
          const empId = req.params.id; // Assuming id is part of the URL parameter
      
          // Find the designation by _id and remove it
          const deleteEmployee = await employeeModel.findOneAndRemove(
            { _id: empId } // Pass the _id as an object
          );
      
          if (!deleteEmployee) {
            return res.status(404).json({ error: 'Employee detail not found' });
          }
      
          res.status(200).json({ message: 'Employee detail deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      }

}
module.exports = employeeController;