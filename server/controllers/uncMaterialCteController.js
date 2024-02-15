const uncMaterialCteModel = require("../models/uncMaterialCteModel")
const {uncTypeBModel, clccf} = require("../models/uncTypeBModel")
const uncMaterialCteController = {
    getAllUncMaterialCte: async (req, res) => {
        try {
          const uncMaterialCteResult = await uncMaterialCteModel.find();
          res.status(202).json({ result: uncMaterialCteResult, status: 1 });
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Mu');
        }
      },

      getMaterialCteAndTypeB: async (req, res) => {
        try {
          const uncMaterialCteResult = await uncMaterialCteModel.find();
          const uncTypeBResult = await uncTypeBModel.find();
          const clccfResult = await clccf.find();
      
          res.status(202).json({
            uncMaterialCteResult: uncMaterialCteResult,
            uncTypeBResult: uncTypeBResult,
            uncClccfResult: clccfResult,
            status: 1
          });
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Mu');
        }
      }
      
}
module.exports = uncMaterialCteController;