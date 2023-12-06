const employeeModel = require("../models/employeeModel")

const employeeController = {
  getAllEmployee: async (req, res) => {
    try {
      const employeeResult = await employeeModel.find();
      res.status(202).json({ result: employeeResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Employee');
    }
  },

  getAllActiveEmployees: async (req, res) => {
    try {
      const employeeResult = await employeeModel.find({employmentStatus: "Active"});
      res.status(202).json({ result: employeeResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Employee');
    }
  },
  createEmployee: async (req, res) => {

    try {
      const { employeeCode, title, firstName, lastName, dob, address, city, state, contactNumber, designation, department, mailId, doj, employmentStatus, reportTo } = req.body;

      // if (contactNumber.length !== 10) {
      //   return res.status(403).json({
      //     message: "Contact Number Should be exactly 10 digits",
      //     status: 0
      //   });
      // }
     
      const employeeResult = new employeeModel({ employeeCode, title, firstName, lastName, dob, address, city, state, contactNumber, designation, department, mailId, doj, employmentStatus, reportTo });

      
      const validationError = employeeResult.validateSync();

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
      await employeeResult.save();
      res.status(202).json({ message: "Employee Data Successfully Saved", status: 1 });
      
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
  updateEmployee: async (req, res) => {
    try {
      const empId = req.params.id; // Assuming desId is part of the URL parameter
      // if (isNaN(desId)) {
      //   return res.status(400).json({ error: 'Invalid desId value' });
      // }

      // Create an object with the fields you want to update
      const updateEmpFields = {
        /* Specify the fields and their updated values here */
        employeeCode: req.body.employeeCode, title: req.body.title, firstName: req.body.firstName, lastName: req.body.lastName, dob: req.body.dob, address: req.body.address, city: req.body.city, state: req.body.state, contactNumber: req.body.contactNumber, designation: req.body.designation, department: req.body.department, mailId: req.body.mailId, doj: req.body.doj, employmentStatus: req.body.employmentStatus, reportTo: req.body.reportTo // Example: updating the 'name' field
        // Add more fields as needed
      };
      const updatedEmployee = new employeeModel(updateEmpFields);

      // Perform synchronous validation on the updatedEmployee
      const validationError = updatedEmployee.validateSync();
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
      const updateEmployee = await employeeModel.findOneAndUpdate(
          { _id: empId },
          updateEmpFields,
          { new: true } // To return the updated document
      );

      if (!updateEmployee) {
          return res.status(404).json({ error: 'Employee not found' });
      }
      console.log("Employee Updated Successfully")
      res.status(200).json({ result: this.updateEmployee, message: "Employee Updated Successfully" });
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
deleteEmployee: async (req, res) => {
  try {

    const { employeeIds } = req.body; // Assuming an array of vendor IDs is sent in the request body
    console.log(req.body)
    const deleteResults = []; 

    for (const employeeId of employeeIds) {
      // Find and remove each vendor by _id
      const deletedEmployee = await employeeModel.findOneAndRemove({ _id: employeeId });
      console.log(deletedEmployee)
      if (!deletedEmployee) {
        // If a vendor was not found, you can skip it or handle the error as needed.
        console.log(`Employee with ID ${employeeId} not found.`);
        res.status(500).json({ message:  `Employee with ID not found.`});
        
      } else {
        console.log(`Employee with ID ${employeeId} deleted successfully.`);
        deleteResults.push(deletedEmployee); 
      }
    }

    return res.status(202).json({ message: 'Employee deleted successfully', result: `${deleteResults.length} Employee Deleted Successfull`, status: 1 });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
},
getEmployeeById : async (req, res) => {
  try {
    const employeeId = req.params.id; // Assuming desId is part of the URL parameter
    // if (isNaN(desId)) {
    // Find the designation by desId and update it
    const getEmployeeById = await employeeModel.findOne(
        { _id: employeeId }// To return the updated document
    );

    if (!getEmployeeById) {
        return res.status(404).json({ error: 'Employee not found' });
    }
    console.log("Employee Get Successfully")
    res.status(200).json({ result: getEmployeeById, message: "Employee get Successfully" });
} catch (error) {
    console.log(error);
    res.status(500).json({ error: error, status: 0 });
}
}

}
module.exports = employeeController; 