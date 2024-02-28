const mongoose = require('mongoose');
const dayjs = require('dayjs')
const uniqueValidator = require('mongoose-unique-validator');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const itemHistorySchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: [true, "ItemId missing"]
  },
  itemCalId: String,
  itemGrnId: String,
  itemMasterRef: String,
  selectedItemMaster: [],
  isItemMaster: String,
  itemAddMasterName: String,
  itemPlant: {
    type: String,
  },
  itemIMTENo: {
    type: String,
    required: [true, "Item IMTE No required"]
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
  itemUncertainty: String,
  itemUncertaintyUnit: String,
  itemPrevCalData: String,
  itemCalDate: String,
  itemLastCalDate: String,
  itemDueDate: String,
  itemLastDueDate: String,
  itemCalibratedAt: String,
  itemCertificateName: String,
  itemCertificateNo: String,
  itemCalStatus: String,
  itemCalibratedBy: String,
  itemCalApprovedBy: String,
  itemOBType: String,
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
  acceptanceCriteria: [],
  itemUncertainty: String,
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


