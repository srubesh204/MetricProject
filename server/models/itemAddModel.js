const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const itemAddSchema = new mongoose.Schema({
  itemMasterType: String,
  itemIMTENo: String,
  itemImageName: String,
  itemType: String,
  itemRangeSize: String,
  itemRangeSizeUnit: String,
  itemLC: String,
  itemLCUnit: String,
  itemMFRNo: String,
  itemMake:String,
  itemModelNo: String,
  itemStatus: String,
  itemReceiptDate:String,
  itemDepartment:String,
  itemArea: String,
  itemPlaceOfUsage:String,
  itemCalFreInMonths: String,
  itemCalAlertDays: String,
  itemCalDoneAt: String,
  itemCalibrationSrc: String,
  itemMaster: [],
  itemSupplier: [],
  itemOEM: [],
  itemCalDate: String,
  itemDueDate:String,
  itemCalibratedAt:String,
  itemCertificateName:String,
  itemPartName: [],
   acceptanceCriteria:[{
    parameter:String,
    acRangeSize:String,
    acRangeSizeUnit:String,
    min:String,
    max:String,
    wearLimit:String,
    accuracy:String,
    unit:String,
    observedSize:String
   }],

});
itemAddSchema.plugin(uniqueValidator);
module.exports = mongoose.model('itemAdd', itemAddSchema);