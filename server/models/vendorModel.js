const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  vendorCode: String,
  aliasName: String,
  fullName: String,
  dor: String,
  address: String,
  state: String,
  city: String,
  oem: String,
  customer: String,
  supplier: String,
  subContractor: String,
  certificate: String,
  certificateValidity : String,
  vendorStatus : String,
  vendorContacts : [{name : String, contactNumber : String, mailId : String, vcStatus : String}]
});

module.exports = mongoose.model('vendor', vendorSchema);

