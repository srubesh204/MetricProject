const mongoose = require('mongoose');
const dayjs = require('dayjs')
const uniqueValidator = require('mongoose-unique-validator');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const itemHistorySchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: [true, "ItemId missing"]
  },

  itemMasterRef: String,
  selectedItemMaster: [],
  isItemMaster: String,
  itemAddMasterName: String,
  itemPlant: {
    type: String,
  },
  itemIMTENo: {
    type: String,
    unique: [true, "IMTE No Should be Unique"],
  },
  
  itemType: String,
  itemRangeSize: String,
  itemRangeSizeUnit: String,
  
  itemLC: String,
  itemLCUnit: String,
 
  itemModelNo: String,
  itemStatus: String,
  itemReceiptDate: String,
  itemDepartment: String,
  itemCurrentLocation: String,
  itemLocation: String,
  itemLastLocation: String,
 
 
  itemCalFreInMonths: String,
  itemCalAlertDays: String,
  itemCalibrationSource: String,
  itemCalibrationDoneAt: String,
 
 
 
  
  itemUncertainity: String,
  itemUncertainityUnit: String,
  itemPrevCalData: String,
  itemCalDate: String,
  itemLastCalDate: String,
  itemDueDate: String,
  itemLastDueDate: String,
  itemCalibratedAt: String,
  itemCertificateName: String,
  itemCertificateNo: String,
 
 
  dcId: String,
  dcStatus: String,
  dcCreatedOn: String,
  dcNo: String,
  lastDcId: String,
  lastDcStatus: String,
  lastDcCreatedOn: String,
  lastDcNo: String,
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
itemHistorySchema.plugin(uniqueValidator);
itemHistorySchema.plugin(mongooseSequence, { inc_field: 'itemHistoryId', });

module.exports = mongoose.model('itemHistory', itemHistorySchema);