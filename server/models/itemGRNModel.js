const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseSequence = require('mongoose-sequence')(mongoose);
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
    required: [true, "GRN Number Required"]
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
  grnItemUncertainity: String,
  grnItemCalDate: String,
  grnItemDueDate: String,
  grnItemCertificateStatus: String,
  grnItemCertificateNo: String,
  grnItemCertificate: String,
  grnUncertainity: String,
  grnItemCalStatus: String,

});
itemGRNSchema.plugin(uniqueValidator);
itemGRNSchema.plugin(mongooseSequence, { inc_field: 'grnId', });
module.exports = mongoose.model('itemGRN', itemGRNSchema);