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
  subcontractor: String,
  certificate: String,
  certificateValidity : String,
  vendorContacts : {name : String, contactNumber : String, mailId : String, status : String}
});

module.exports = mongoose.model('vendor', vendorSchema);