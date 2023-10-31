const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const vendorSchema = new mongoose.Schema({
  vendorCode: {
    type: String,
    unique: true,
    required: [true, "Vendor is Required"]
    
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
  subContractor: String,
  certificate: String,
  certificateValidity : String,
  vendorStatus : String,
  vendorContacts : [{name : String, 
    contactNumber : {
      type: String,
      required: [true, "Phone number is must"],
      minLength: [10, "Phone should be within 10 digits"],
      maxLength: [10, "Phone should not more than 10 digits"]
        
  },
    mailId : {
    type: String,
    unique: [true, "Email should be unique"],
    required: [true, "Email Required"]
    
  } , 
  vcStatus : String}]
});
vendorSchema.plugin(uniqueValidator);
module.exports = mongoose.model('vendor', vendorSchema);

