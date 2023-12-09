const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const itemDcSchema = new mongoose.Schema({
  
  dcPartyName:String,
  dcPartyCode:String,
  dcPartyAddress:String,
  dcNo:String,
  dcDate:String,
  dcReason:String,
  dcCommonRemarks:String,
  dcMasterName:String,
  dcPartyItems:[]
});
itemDcSchema.plugin(uniqueValidator);
module.exports = mongoose.model('itemDc', itemDcSchema);