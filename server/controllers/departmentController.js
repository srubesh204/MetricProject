const departmentModel = require("../models/departmentModel")

const departmentControllers = {
    getDepartment: async (req, res) => {
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
          const departmentResult = new departmentModel({ department, area, placeOfUsage });
          await departmentResult.save();
          res.status(201).json(departmentResult);
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: 'Internal server error on Department' });
        }
      }
}
module.exports = departmentControllers;