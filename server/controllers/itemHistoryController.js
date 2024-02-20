const itemHistory = require("../models/itemHistory")
const dayjs = require('dayjs')



const itemHistoryController = {
  getAllItemHistory: async (req, res) => {
    try {
      const itemHistoryData = await itemHistory.find();
      
      res.status(202).json({ result: itemHistoryData, status: 1 });
      //res.status(200).json(employees);

    } catch (err) {
      console.error(err);
      res.status(500).send('Error on ItemHistory');
    }
  },
  getHistoryByIMTENo: async (req, res) => {
    const {imte} = req.params
    try{
      const itemHistoryData = await itemHistory.find({itemIMTENo : imte})
      res.status(202).json({ result: itemHistoryData, status: 1 });
    }catch (err) {
      console.error(err);
      res.status(500).send('Error on ItemHistoryById');
    }
  },
  

}


module.exports = itemHistoryController;