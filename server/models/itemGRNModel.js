const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const formatNoModel = require('./formatNoModel');

const GrnNoCounterSchema = new mongoose.Schema({
  _id: { type: String, default: 'GrnNoCounter' },
  seq: { type: Number, default: 0 },
  year: { type: Number, default: new Date().getFullYear() }
});

const GrnNoCounter = mongoose.model('GrnNoCounter', GrnNoCounterSchema);

const itemGRNSchema = new mongoose.Schema({
  grnPartyRefNo: {
    type: String,
    required: [true, "GRN Party Ref Number Required"]
  },
  grnPartyId: {
    type: String,
    required: [true, "GRN PartyId Required"]
  },
  grnPartyRefDate: {
    type: String,
    required: [true, "GRN Ref Date Number Required"]
  },
  grnPartyName: {
    type: String,
    required: [true, "GRN Party Name Required"]
  },
  grnPartyCode: {
    type: String,
    required: [true, "GRN Party Code Required"]
  },
  grnPartyAddress: {
    type: String,
    required: [true, "GRN Party Address Required"]
  },
  grnNo: {
    type: String,
    unique: [true, "GRN Number should be unique"],

  },
  grnDate: {
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
  grnCommonRemarks: String,
  grnItemId: String,
  isOnSiteGRN: String,
  grnItemAddMasterName: String,
  grnItemType: String,
  grnItemIMTENo: String,
  grnItemRangeSize: String,
  grnItemRangeSizeUnit: String,
  grnItemMFRNo: String,
  grnItemSAPNo: String,
  grnItemLC: String,
  grnItemLCUnit: String,
  grnItemMake: String,
  grnItemModelNo: String,
  grnItemDcNo: String,
  grnItemReceiptDate: String,
  grnItemDepartment: String,
  grnItemArea: String,
  grnItemPlaceOfUsage: String,
  grnItemCalFreInMonths: String,
  grnItemCalAlertDays: String,
  grnItemCalibrationSource: String,
  grnItemCalibrationDoneAt: String,
  grnItemCalibratedAt: String,
  grnItemOBType: String,
  grnItemStatus: String,
  grnAssingStatus: String,
  grnAcCriteria: [
    {
      grnParameter: String,
      grnNominalSize: String,
      grnNominalSizeUnit: String,
      grnMinPS: String,
      grnMaxPS: String,
      grnWearLimitPS: String,
      grnBeforeCalibration: String,
      grnMinOB: String,
      grnMaxOB: String,
      grnAverageOB: String,
      grnOBError: String,
      grnMinPSError: String,
      grnMaxPSError: String,
      rowStatus: String
    },
  ],
  grnItemUncertainty: String,
  grnItemUncertaintyUnit: String,
  grnItemCalFrequencyType: String,
  grnItemCalDate: String,
  grnItemDueDate: String,
  grnItemCertificateStatus: String,
  grnItemCertificateNo: String,
  grnItemCertificate: String,
  
  grnItemCalStatus: String,
  grnCreatedBy: String,
  grnItemSOPNo: String,
  grnItemStandardRef: String,
  

});

itemGRNSchema.pre('save', async function (next) {
  const currentYear = new Date().getFullYear();
  const counter = await GrnNoCounter.findById('GrnNoCounter');
  const prefix = await formatNoModel.findById('formatNo')

  if (!counter) {
    // If the counter document doesn't exist, create it
    await GrnNoCounter.create({ _id: 'GrnNoCounter', seq: 1, year: currentYear });
    this.grnNo = `${prefix && prefix.fCommonPrefix ? prefix.fCommonPrefix : ""}GRN${currentYear}-01`;
  } else if (counter.year !== currentYear) {
    // If the year has changed, reset the counter and update the year
    counter.seq = 1;
    counter.year = currentYear;
    await counter.save();
    this.grnNo = `${prefix && prefix.fCommonPrefix ? prefix.fCommonPrefix : ""}GRN${currentYear}-01`;
  } else {
    // Otherwise, increment the counter
    counter.seq++;
    await counter.save();

    this.grnNo = `${prefix && prefix.fCommonPrefix ? prefix.fCommonPrefix : ""}GRN${currentYear}-${String(counter.seq).padStart(2, '0')}`;
    console.log()
  }
  next();
});


itemGRNSchema.plugin(uniqueValidator);

module.exports = {
  itemGRNModel: mongoose.model('itemGRN', itemGRNSchema),
  GrnNoCounter: GrnNoCounter
};
