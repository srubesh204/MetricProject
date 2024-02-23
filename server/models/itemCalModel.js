const mongoose = require('mongoose');
const dayjs = require('dayjs')
const uniqueValidator = require('mongoose-unique-validator');
const formatNoModel = require('./formatNoModel');


const CalNoCounterSchema = new mongoose.Schema({
  _id: { type: String, default: 'CalNoCounter' },
  seq: { type: Number, default: 0 },
  year: { type: Number, default: new Date().getFullYear() }
});

const CalNoCounter = mongoose.model('CalNoCounter', CalNoCounterSchema);

const itemCal = new mongoose.Schema({
  ItemCalId: String,
  calIMTENo: String,
  calItemName: String,
  calItemType: String,
  calRangeSize: String,
  calRangeSizeUnit: String,
  calItemMFRNo: String,
  calLC: String,
  calLCUnit: String,
  calItemMake: String,
  calItemTemperature: String,
  calItemHumidity: String,
  calItemUncertainity: String,
  calItemUncertainityUnit: String,
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

itemCal.pre('save', async function(next) {
  const currentYear = new Date().getFullYear();
  const counter = await CalNoCounter.findById('CalNoCounter');
  const prefix = await formatNoModel.findById('formatNo')
  console.log(prefix)
  if (!counter) {
    // If the counter document doesn't exist, create it
    await CalNoCounter.create({ _id: 'CalNoCounter', seq: 1, year: currentYear });
    this.calCertificateNo = `${prefix && prefix.fCommonPrefix ? prefix.fCommonPrefix : ""}CAL${currentYear}-01`;
  } else if (counter.year !== currentYear) {
    // If the year has changed, reset the counter and update the year
    counter.seq = 1;
    counter.year = currentYear;
    await counter.save();
    this.calCertificateNo = `${prefix && prefix.fCommonPrefix ? prefix.fCommonPrefix : ""}CAL${currentYear}-01`;
  } else {
    // Otherwise, increment the counter
    counter.seq++;
    await counter.save();
    this.calCertificateNo = `${prefix && prefix.fCommonPrefix ? prefix.fCommonPrefix : ""}CAL${currentYear}-${String(counter.seq).padStart(2, '0')}`;
  }

  next();
});


itemCal.plugin(uniqueValidator);

module.exports = {
  itemCalModel : mongoose.model('itemCal', itemCal),
  CalNoCounter : CalNoCounter
};