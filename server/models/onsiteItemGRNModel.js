const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseSequence = require('mongoose-sequence')(mongoose);
const onsiteItemGRNSchema = new mongoose.Schema({
  osGrnPartyRefNo: String,
  osGrnPartyId: String,
  osGrnPartyRefDate: String,
  osGrnPartyName: String,
  osGrnPartyCode: String,
  osGrnPartyAddress: String,
  osGrnNo: String,
  osGrnDate: String,
  osGrnCommonRemarks: String,
  osGrnDueDate: String,
  osGrnCalDate: String,
  osGrnCertificateStatus: String,
  osGrnCertificateNo: String,
  osGrnUncertainity:String,
  osGrnPartyItems: []
});
onsiteItemGRNSchema.plugin(uniqueValidator);
onsiteItemGRNSchema.plugin(mongooseSequence, { inc_field: 'onsiteId', });
module.exports = mongoose.model('onsiteItemGRN', onsiteItemGRNSchema);