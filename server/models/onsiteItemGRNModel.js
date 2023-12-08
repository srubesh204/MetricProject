const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const onsiteItemGRNSchema = new mongoose.Schema({
  grnPartyRefNo:String,
  grnPartyRefDate:String,
  grnPartyName:String,
  grnPartyCode:String,
  grnPartyAddress:String,
  grnNo:String,
  grnDate:String,
  grncCommonRemarks:String
});
onsiteItemGRNSchema.plugin(uniqueValidator);
module.exports = mongoose.model('onsiteItemGRN', onsiteItemGRNSchema);