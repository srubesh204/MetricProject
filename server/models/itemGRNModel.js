const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const itemGRNSchema = new mongoose.Schema({
  grnPartyRefNo:String,
  grnPartyId:String,
  grnPartyRefDate:String,
  grnPartyName:String,
  grnPartyCode:String,
  grnPartyAddress:String,
  grnNo:String,
  grnDate:String,
  grnCommonRemarks:String,
  grnPartyItems:[]
});
itemGRNSchema.plugin(uniqueValidator);
module.exports = mongoose.model('itemGRN', itemGRNSchema);