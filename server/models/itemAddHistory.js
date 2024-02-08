const mongoose = require('mongoose');
const dayjs = require('dayjs')
const uniqueValidator = require('mongoose-unique-validator');

const itemAddHistory = new mongoose.Schema({
  itemMasterRef: String,
  itemAddMasterName: String,
  itemIMTENo: {
    type: String,
    unique: [true, "IMTE No Should be Unique"],
    required: [true, "IMTE No Required"]
  },
  itemImage: String,
  itemInitialId: String,
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
  itemLastLocation: String,
  itemArea: String,
  itemPlaceOfUsage: String,
  itemCalFreInMonths: String,
  itemCalAlertDays: String,
  itemCalibrationSource: String,
  itemCalibrationDoneAt: String,
  itemCertificateNo: String,
  itemLastCertificateNo: String,
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
          acObMin:String,
          acObMax:String,
          acWearLimit:String,
          acAccuracy: String,
          acObservedSize: String
      }
  ],
  createdAt: {
    type: String,
    default: () => dayjs().format("YYYY-MM-DD"),
    immutable: true,
  },
  updatedAt: {
    type: String,
    default: () => dayjs().format("YYYY-MM-DD"),
  }

});
itemAddSchema.plugin(uniqueValidator);

module.exports = mongoose.model('itemAddHistory', itemAddHistory);