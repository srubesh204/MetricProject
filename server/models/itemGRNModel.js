const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
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
  grnCommonRemarks:String,
  grnPartyItems:[]
});
itemGRNSchema.plugin(uniqueValidator);
module.exports = mongoose.model('itemGRN', itemGRNSchema);