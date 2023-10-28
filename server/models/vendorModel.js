const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const vendorSchema = new mongoose.Schema({
  vendorCode: {
    type: String,
    unique: true,
    required: [true, "Vendor must"]
    
  } ,
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
  vendorStatus : String,
  vendorContacts : [{name : String, contactNumber : String, mailId : String, vcStatus : String}]
});
vendorSchema.plugin(uniqueValidator);
module.exports = mongoose.model('vendor', vendorSchema);

