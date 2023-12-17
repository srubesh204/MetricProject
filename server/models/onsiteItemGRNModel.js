const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const onsiteItemGRNSchema = new mongoose.Schema({
  OsGrnPartyRefNo: String,
  OsGrnPartyId: String,
  OsGrnPartyRefDate: String,
  OsGrnPartyName: String,
  OsGrnPartyCode: String,
  OsGrnPartyAddress: String,
  OsGrnNo: String,
  OsGrnDate: String,
  OsGrnCommonRemarks: String,
  OsGrnDueDate: String,
  OsGrnCalDate: String,
  OsGrnCertificateStatus: String,
  OsGrnCertificateNo: String,
  OsGrnUncertainity:String,
  OsGrnPartyItems: []
});
onsiteItemGRNSchema.plugin(uniqueValidator);
module.exports = mongoose.model('onsiteItemGRN', onsiteItemGRNSchema);