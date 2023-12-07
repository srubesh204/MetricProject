const mongoose = require('mongoose');
const dayjs = require('dayjs')
const uniqueValidator = require('mongoose-unique-validator');

const itemCal = new mongoose.Schema({

  calItemId: String,
  calIMTENo: String,
  calItemName: String,
  calItemType: String,
  calRangeSize: String,
  calItemMFRNo: String,
  calLC: String,
  calItemMake: String,
  calItemTemperature: String,
  calItemHumidity: String,
  calItemUncertainity: String,
  calItemSOPNo: String,
  calStandardRef: String,
  calOBType: String,
  calCertificateNo: String,
  calItemCalDate: String,
  calItemDueDate: String,
  calItemEntryDate: String,
  calCalibratedBy: String,
  calApprovedBy: String,
  calBeforeData: String,
  calcalibrationData: [{
    calParameter: String,
    calNominalSize: String,
    calNominalSizeUnit: String,
    calMinPS: String,
    calMaxPS: String,
    calWearLimitPS: String,
    calMinOB: String,
    calMaxOB: String,
    calAverageOB: String,
    calOBError: String,
    calMinPSError: String,
    calMaxPSError: String,
  }],
  calMasterUsed: [],
  calCreatedAt: {
    type: String,
    default: () => dayjs().format("YYYY-MM-DD"),
    immutable: true,
  },
  calUpdatedAt: {
    type: String,
    default: () => dayjs().format("YYYY-MM-DD")
  }

});
itemCal.plugin(uniqueValidator);

module.exports = mongoose.model('itemCal', itemCal);