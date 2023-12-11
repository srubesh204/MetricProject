const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const itemDcSchema = new mongoose.Schema({
  
  dcPartyId:String,
  dcPartyType:String,
  dcPartyName:String,
  dcPartyCode:String,
  dcPartyAddress:String,
  dcNo:String,
  dcDate:String,
  dcReason:String,
  dcCommonRemarks:String,
  dcPartyItems:[]
});
itemDcSchema.plugin(uniqueValidator);
module.exports = mongoose.model('itemDc', itemDcSchema);