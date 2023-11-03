const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const itemAddSchema = new mongoose.Schema({
  selectItemMasterType: String,
  createImteNo: String,
  showImteNo: String,
  itemImageName: String,
  itemType:String,
  itemMfrNo:String,
  itemMake:String,
  itemStatus:String,
  range:String,
  lc:String,
  modelNo:String,
  itemReceiptDate:String,
  itemDepartment:[{
    department:String,
    area: String,
    placeOfUsage: String
  }],
   acceptanceCriteria:[{
    parameter:String,
    range:String,
    lcunit:String,
    min:String,
    max:String,
    wearLimit:String,
    accuracy:String,
    unit:String,
   }],

});
itemAddSchema.plugin(uniqueValidator);
module.exports = mongoose.model('itemAdd', itemAddSchema);