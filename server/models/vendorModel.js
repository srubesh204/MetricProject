const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const vendorSchema = new mongoose.Schema({
  vendorCode: {
    type: String,
    unique: [true, "Vendor Code should be unique"],
    required: [true, "Vendor is Required"]

  },
  aliasName: {
    type: String,
    required: [true, "AliasName is required"]
  },
  fullName: {
    type: String,
    required: [true, "FullName is required"]
  },
  dor: String,
  address: String,
  state: String,
  city: String,
  oem: String,
  customer: String,
  supplier: String,
  subContractor: String,
  certificate: String,
  certificateValidity: String,
  vendorStatus: String,
  vendorContacts: [{
    name: String,
    contactNumber: {
      type: Number,
      // required: [true, "Vendor Contact number is must"],
      minLength: [10, "Vendor Contact should be within 10 digits"],
      maxLength: [10, "Vendor Contact should not more than 10 digits"]

    },
    mailId: {
      type: String,
      // unique: [true, "Vendor Email should be unique"],
      // required: [true, "Email Required"],
      lowercase: true

    },
    vcStatus: String
  }]
});
vendorSchema.plugin(uniqueValidator);
module.exports = mongoose.model('vendor', vendorSchema);

