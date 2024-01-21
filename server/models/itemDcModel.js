const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseSequence = require('mongoose-sequence')(mongoose);
const itemDcSchema = new mongoose.Schema({

  dcPartyId: {
    type: String,
    required: [true, "DC Party name is required"]
  },
  dcPartyType: {
    type: String,
    required: [true, "DC Party type is required"]
  },
  dcPartyName: {
    type: String,
    required: [true, "DC Party name is required"]
  },
  dcPartyCode: {
    type: String,
    required: [true, "DC Party code is required"]
  },
  dcPartyAddress: {
    type: String,
    required: [true, "DC Party address is required"]
  },
  dcNo: {
    type: String,
   
    unique: [true, "DC No Should be Unique"]
  },
  dcDate: {
    type: String,
    required: [true, "DC Date is required"]
  },
  dcReason: {
    type: String,
    required: [true, "DC Reason is required"]
  },
  dcPlant: {
    type: String,
    required: [true, "Plant is required"]
  }, 
  dcDepartment: {
    type: [],
    required: [true, "Department Required"]
  },
  dcCommonRemarks: String,
  dcMasterName: String,
  dcPartyItems: {
    type: [],
    required: [true, "Item Required"]
  }
});
itemDcSchema.plugin(uniqueValidator);
itemDcSchema.plugin(mongooseSequence, { inc_field: 'dcId', prefix: 'SBCDEP' });
module.exports = mongoose.model('itemDc', itemDcSchema);