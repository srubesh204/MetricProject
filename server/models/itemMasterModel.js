const mongoose = require('mongoose');

const itemMasterSchema = new mongoose.Schema({
 
  itemType: String,
  itemDescription : {
    type: String,
  unique: true,
  required: [true, "Item Description must"]
  },
  itemPrefix : String,
  itemFq : Number,
  cabAlertInDay : Number,
  wino : String,
  unCertainty : Number,
  unCertaintyUnit : String,
  standardRef : String,
  itemImage : String,
  workInsName : String
  
});

module.exports = mongoose.model('itemmaster', itemMasterSchema);
