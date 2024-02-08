const mongoose = require('mongoose');
const dayjs = require('dayjs')
const uniqueValidator = require('mongoose-unique-validator');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  calItemIdSeq: { type: Number, default: 0 },
  calCertificateNoSeq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

const itemCal = new mongoose.Schema({
  ItemCalId: String,
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
  calReportName: String,
  calCertificateNo: {
    type: String,
    unique: true,
  },
  calReportAvailable: {
    type: String,
    enum: ['yes', 'no'],
    default: 'yes',
    required: [true, "Report status required"]
  },
  calItemCalDate: String,
  calItemDueDate: String,
  calItemEntryDate: String,
  calCalibratedBy: String,
  calCalibratedById: String,
  calApprovedBy: String,
  calBeforeData: String,
  calStatus: String,
  calSource: String,
  calcalibrationData: [],
  calMasterUsed: [],
  calItemFreInMonths: String,
  calPlant: String,
  calDepartment: {
    type: [],
    required: [true, "Department Required"]
  },
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
itemCal.plugin(mongooseSequence, { inc_field: 'calId', });



module.exports = mongoose.model('itemCal', itemCal);