const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const itemAddSchema = new mongoose.Schema({
    itemMasterName: String,
    itemIMTENo: String,
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
            acWearLimit: String,
            acAccuracy: String,
            acObservedSize: String
        }
    ]
});
itemAddSchema.plugin(uniqueValidator);
module.exports = mongoose.model('itemAdd', itemAddSchema);