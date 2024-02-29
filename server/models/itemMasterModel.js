const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const itemMasterSchema = new mongoose.Schema({
  itemType: String,
  itemDescription: {
    type: String,
    required: [true, "Item Description is Required"]
  },
  itemPrefix: String,
  itemFqInMonths: Number,
  calAlertInDay: Number,
  SOPNo: String,
  uncertainty: Number,
  uncertaintyUnit: String,
  standardRef: String,
  itemMasterImage: String,
  workInsName: String,
  status: String,
  itemFrequencyType: String,
  itemMasterPlant: String,
  calibrationPoints: []
});

itemMasterSchema.plugin(uniqueValidator);
itemMasterSchema.plugin(mongooseSequence, { inc_field: 'itemMasterId' });
module.exports = mongoose.model('itemMaster', itemMasterSchema);
