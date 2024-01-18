const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const dayjs = require('dayjs')

const testSchema = new mongoose.Schema({
  itemMasterRef: String,
  selectedItemMaster: [],
  isItemMaster: String,
  itemAddMasterName: String,
  itemPlant: {
    type: String,
    
  },
  itemIMTENo: {
    type: String, 
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
  itemCurrentLocation: String,
  itemLocation: String,
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
  itemUncertainity: String,
  itemUncertainityUnit: String,
  itemPrevCalData: String,
  itemCalDate: String,
  itemDueDate: String,
  itemCalibratedAt: String,
  itemCertificateName: String,
  itemCertificateNo: String,
  itemPartName: [],
  itemOBType: String,
  dcId: String,
  dcStatus: String,
  dcCreatedOn: String,
  dcNo: String,
  grnId: String,
  grnNo: String,
  grnStatus: String,
  grnCreatedOn: String,
  acceptanceCriteria: [
    {
      acParameter: String,
      acNominalSize: String,
      acNominalSizeUnit: String,
      acMinPS: String,
      acMaxPS: String,
      acWearLimitPS: {
        type: String,
        default: () => "--"
      },
      acMinOB: String,
      acMaxOB: String,
      acAverageOB: String,
      acOBError: String,
      acMinPSError: String,
      acMaxPSError: String,
    }
  ],
  itemUncertainity: String,
  createdAt: {
    type: String,
    default: () => dayjs().format("YYYY-MM-DD"),
    immutable: true,
  },

  updatedAt: {
    type: String,
    default: () => dayjs().format("YYYY-MM-DD")
  },
  itemCreatedBy: {
    type: String,
  },
  itemLastModifiedBy: {
    type: String,
  }
});
testSchema.plugin(uniqueValidator);

module.exports = mongoose.model('test', testSchema);