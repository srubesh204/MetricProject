const mongoose = require('mongoose');
const dayjs = require('dayjs')
const uniqueValidator = require('mongoose-unique-validator');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const itemAddSchema = new mongoose.Schema({
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
    required: [true, "IMTE No Required"]
  },
  itemSAPNo: String,
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
  itemStatusReason: String,
  itemLastStatus: String,
  itemReceiptDate: String,
  itemDepartment: String,
  itemCurrentLocation: String,
  itemLocation: String,
  itemLastPlace: {
    type: String,
  },
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
  itemLastCalDate: String,
  itemDueDate: String,
  itemLastDueDate: String,
  itemCalibratedAt: String,
  itemCertificateName: String,
  itemLastCertificateName: String,
  itemCertificateNo: String,
  itemLastCertificateNo: String,
  itemPartName: [],
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
  acceptanceCriteria: [
    {
      acParameter: String,
      acNominalSize: String,
      acNominalSizeUnit: String,
      acMinPS: String,
      acMaxPS: String,
      acWearLimitPS: {
        type: String,
        
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
  },
  calibrationCost: String,
  gaugeUsage: String,
  lifealertDays: String,
  purchaseRefNo: String,
  purchaseDate: String,
  purchaseCost: String,
  specialRemark: String,
  drawingIssueNo: String,
  drawingNo: String,
  rdName: String,
  msaName: String,
  otherFile: String,
  

});
itemAddSchema.plugin(uniqueValidator);
itemAddSchema.plugin(mongooseSequence, { inc_field: 'itemId', });

module.exports = mongoose.model('itemAdd', itemAddSchema);