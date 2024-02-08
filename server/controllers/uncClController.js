const uncClModel = require("../models/uncClModel")

const uncClController = {
    getAllUncCl: async (req, res) => {
        try {
          const uncClResult = await uncClModel.find();
          res.status(202).json({ result: uncClResult, status: 1 });
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Mu');
        }
      },
}
module.exports = uncClController;