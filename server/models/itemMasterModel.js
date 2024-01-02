const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const itemMasterSchema = new mongoose.Schema({
 
  itemType: String,
  itemDescription : {
    type: String,
  unique: [true, "ItemDescription Name should be Unique"],
  required: [true, "Item Description is Required"]
  },
  itemPrefix : String,
  itemFqInMonths : Number,
  calAlertInDay : Number,
  SOPNo : String,
  uncertainty : Number,
  uncertaintyUnit : String,
  standardRef : String,
 
  itemImageName : String,
  workInsName : String,
  status : String,
  calibrationPoints : []

  
});
itemMasterSchema.plugin(uniqueValidator);
module.exports = mongoose.model('itemMaster', itemMasterSchema);
