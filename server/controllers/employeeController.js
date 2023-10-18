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
          const { empCode, title, firstName, lastName, dob, address, city, state, contactNumber, designation, department, maidId, doj, employmentStatus, reportTo} = req.body;
          const employeeResult = new employeeModel({ empCode, title, firstName, lastName, dob, address, city, state, contactNumber, designation, department, maidId, doj, employmentStatus, reportTo });
          await employeeResult.save();
          res.status(202).json({result :employeeResult, status: 1});
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: 'Internal server error on Employee' , status: 0});
        }
      }
}
module.exports = employeeController;