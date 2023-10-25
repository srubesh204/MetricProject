const generalModel = require("../models/generalModel")

const generalController = {
    getAllStateAndCity: async (req, res) => {
        try {
          const generalResult = await generalModel.find().sort({state :1}).distinct("state");
          res.status(203).json(generalResult);
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on State and City');
        }
      },
      getCityByStateName: async (req, res) => {
        try {
          const stateData = req.params.id
          const generalResult = await generalModel.find({state : stateData}).sort({name : 1});
          res.status(203).json(generalResult);
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on State and City');
        }
      }
      
}
module.exports = generalController;