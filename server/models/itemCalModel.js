const mongoose = require('mongoose');
const dayjs = require('dayjs')
const uniqueValidator = require('mongoose-unique-validator');

const itemCal = new mongoose.Schema({
  calItemId: String,
  calIMTENo: {
    type: String,
    required: [true],
  },
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
  calCertificateNo: String,
  calItemCalDate: String,
  calItemDueDate: String,
  calItemEntryDate: String,
  calCalibratedBy: String,
  calApprovedBy: String,
  calcalibrationData: [],
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