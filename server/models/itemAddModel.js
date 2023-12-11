const mongoose = require('mongoose');
const dayjs = require('dayjs')
const uniqueValidator = require('mongoose-unique-validator');

const itemAddSchema = new mongoose.Schema({
  itemMasterRef: String,
  selectedItemMaster: [],
  isItemMaster: String,
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
  itemLastLocation: String,
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
  itemCertificateNo : String,
  itemPartName: [],
  itemOBType: String,
  dcStatus: String,
  dcCreatedOn: String,
  acceptanceCriteria: [
      {
        acParameter: String,
        acNominalSize: String,
        acNominalSizeUnit: String,
        acMinPS: String,
        acMaxPS: String,
        acWearLimitPS: String,
        acMinOB: String,
        acMaxOB: String,
        acAverageOB: String,
        acOBError: String,
        acMinPSError: String,
        acMaxPSError: String,
      }
  ],
  itemUncertainity : String,
  createdAt: {
    type: String,
    default: () => dayjs().format("YYYY-MM-DD"),
    immutable: true,
  },
  updatedAt: {
    type: String,
    default: ()=> dayjs().format("YYYY-MM-DD")
  }

});
itemAddSchema.plugin(uniqueValidator);

module.exports = mongoose.model('itemAdd', itemAddSchema);