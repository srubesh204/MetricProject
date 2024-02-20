const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const formatNoModel = require('./formatNoModel');

const DcNoCounterSchema = new mongoose.Schema({
  _id: { type: String, default: 'dcNoCounter' },
  seq: { type: Number, default: 0 },
  year: { type: Number, default: new Date().getFullYear() }
});

const DcNoCounter = mongoose.model('DcNoCounter', DcNoCounterSchema);

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
  },
  dcCreatedBy : {
    type: String,
    required: [true, "DC Created By Required"]
  }
});


itemDcSchema.pre('save', async function(next) {
  const currentYear = new Date().getFullYear();
  const counter = await DcNoCounter.findById('dcNoCounter');
  const prefix = await formatNoModel.findById('formatNo')

  if (!counter) {
    // If the counter document doesn't exist, create it
    await DcNoCounter.create({ _id: 'dcNoCounter', seq: 1, year: currentYear });
    this.dcNo = `${prefix && prefix.fCommonPrefix ? prefix.fCommonPrefix : ""}DC${currentYear}-01`;
  } else if (counter.year !== currentYear) {
    // If the year has changed, reset the counter and update the year
    counter.seq = 1;
    counter.year = currentYear;
    await counter.save();
    this.dcNo = `${prefix && prefix.fCommonPrefix ? prefix.fCommonPrefix : ""}DC${currentYear}-01`;
  } else {
    // Otherwise, increment the counter
    counter.seq++;
    await counter.save();
    this.dcNo = `${prefix && prefix.fCommonPrefix ? prefix.fCommonPrefix : ""}DC${currentYear}-${String(counter.seq).padStart(2, '0')}`;
  }

  next();
});

itemDcSchema.plugin(uniqueValidator);
module.exports = {
  itemDcModel: mongoose.model('itemDc', itemDcSchema),
  DcNoCounter: DcNoCounter
};
