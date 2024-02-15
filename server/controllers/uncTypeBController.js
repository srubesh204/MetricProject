const { uncTypeBModel, clccf } = require("../models/uncTypeBModel")

const uncTypeBController = {
  getAllUncTypeB: async (req, res) => {
    try {
      const uncTypeBResult = await uncTypeBModel.find();
      res.status(202).json({ result: uncTypeBResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on UncTypeB');
    }
  },
  getAllClccf: async (req, res) => {
    try {
      const clccfResult = await clccf.find();
      res.status(202).json({ result: clccfResult, status: 1 });
      //res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error on Clccf');
    }
  },
}
module.exports = uncTypeBController;