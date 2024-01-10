const mongoose = require('mongoose');
const dayjs = require('dayjs')
const uniqueValidator = require('mongoose-unique-validator');

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  calItemIdSeq: { type: Number, default: 0 },
  calCertificateNoSeq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

const itemCal = new mongoose.Schema({
  calAutoId: {
    type: Number,
    unique: [true]
  },
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
    calItemUncertainity:String,
    calItemSOPNo: String,
    calStandardRef: String,
    calOBType: String,
    calCertificateNo:{
      type: Number,
      unique: true,
    },
    calItemCalDate: String,
    calItemDueDate: String,
    calItemEntryDate: String,
    calCalibratedBy: String,
    calApprovedBy: String,
    calBeforeData: String,
    calStatus: String,
    calSource: String,
    calcalibrationData: [],
    calMasterUsed: [],
    calItemFreInMonths: String,
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

itemCal.pre('save', function (next) {
  const doc = this;
  Counter.findOneAndUpdate(
    { _id: 'itemId' },
    { $inc: { calItemIdSeq: 1, calCertificateNoSeq: 1 } },
    { new: true, upsert: true }
  ).then(counter => {
    doc.calAutoId = counter.calItemIdSeq;
    doc.calCertificateNo = counter.calCertificateNoSeq;
    next();
  }).catch(err => next(err));
});

module.exports = mongoose.model('itemCal', itemCal);