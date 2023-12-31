const dayjs = require('dayjs')
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

console.log(dayjs().format("YYYY-MM-DD"))

const demo = new mongoose.Schema({
  itemMasterRef: String,
  itemAddMasterName: String,
  itemIMTENo: {
    type: String,
    unique: [true, "IMTE No Should be Unique"],
    required: [true, "IMTE No Required"]
  },
  itemImage: String,
  itemType: String,
  itemRangeSize: String,
  itemRangeSizeUnit: String,
  itemMFRNo: String,
  itemLC: String,
  itemLCUnit: String,
  itemMake: String,
  itemModelNo: String,
  itemStatus: String,
  itemReceiptDate: String,
  itemDepartment: String,
  itemArea: String,
  itemPlaceOfUsage: String,
  itemCalFreInMonths: String,
  itemCalAlertDays: String,
  itemCalibrationSource: String,
  itemCalibrationDoneAt: String,
  itemItemMasterName: String,
  itemItemMasterIMTENo: [],
  itemSupplier: [],
  itemOEM: [],
  itemCalDate: String,
  itemDueDate: String,
  itemCalibratedAt: String,
  itemCertificateName: String,
  itemPartName: [],
  acceptanceCriteria: [
      {
          acAccuracyUnit: String,
          acRangeSizeUnit: String,
          acParameter: String,
          acRangeSize: String,
          acMin: String,
          acMax: String,
          acPsMin: String,
          acPsMax:String,
          acPsWearLimit:String,
          acAccuracy: String,
          acObservedSize: String
      }
  ],
  createdAt : {
    type: String,
    default: () => Date.now().format("YYYY-MM-DD"),
    immutable :  true
  }

});
demo.plugin(uniqueValidator);

module.exports = mongoose.model('demo', demo);