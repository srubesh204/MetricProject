const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
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
    required: [true, "DC No is required"],
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
  dcCommonRemarks: String,
  dcMasterName: String,
  dcPartyItems: {
    type: []
  }
});
itemDcSchema.plugin(uniqueValidator);
module.exports = mongoose.model('itemDc', itemDcSchema);