const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseSequence = require('mongoose-sequence')(mongoose);
const itemGRNSchema = new mongoose.Schema({
  grnPartyRefNo:{
    type: String,
    required: [true, "GRN Party Ref Number Required"]
  },
  grnPartyId:{
    type: String,
    required: [true, "GRN PartyId Required"]
  },
  grnPartyRefDate:{
    type: String,
    required: [true, "GRN Ref Date Number Required"]
  },
  grnPartyName:{
    type: String,
    required: [true, "GRN Party Name Required"]
  },
  grnPartyCode:{
    type: String,
    required: [true, "GRN Party Code Required"]
  },
  grnPartyAddress:{
    type: String,
    required: [true, "GRN Party Address Required"]
  },
  grnNo:{
    type: String,
    required: [true, "GRN Number Required"]
  },
  grnDate:{
    type: String,
    required: [true, "GRN Date Required"]
  },
  grnPlant: {
    type: String,
    required: [true, "Plant is required"]
  }, 
  grnDepartment: {
    type: [],
    required: [true, "Department Required"]
  },
  grnCommonRemarks:String,
  grnPartyItems:[]
});
itemGRNSchema.plugin(uniqueValidator);
itemGRNSchema.plugin(mongooseSequence, { inc_field: 'grnId', });
module.exports = mongoose.model('itemGRN', itemGRNSchema);