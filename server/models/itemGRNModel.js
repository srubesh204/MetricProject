const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const itemGRNSchema = new mongoose.Schema({
  partyRefNo:String,
  partyRefDate:String,
  partyName:String,
  partyCode:String,
  partyAddress:String,
  GRNNo:String,
  GRNDate:String,
  commonRemarks:String
});
itemGRNSchema.plugin(uniqueValidator);
module.exports = mongoose.model('itemGRN', itemGRNSchema);