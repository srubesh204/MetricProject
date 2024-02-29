const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseSequence = require('mongoose-sequence')(mongoose);
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
    required: [true, "FullName is required"],
    unique: [true, "Vendor fullName should be unique"]
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
    },
    mailId: {
      type: String,
      lowercase: true
    },
    vcStatus: String
  }] ,
  vendorPlant: {
    type: [],
    required: [true, "Vendor Plant required"]
  }
});
vendorSchema.plugin(uniqueValidator);
vendorSchema.plugin(mongooseSequence, { inc_field: 'vendorId', });
module.exports = mongoose.model('vendor', vendorSchema);

