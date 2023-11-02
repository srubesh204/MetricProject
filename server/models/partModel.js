const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const partSchema = new mongoose.Schema({
  partNo: {
    type: String,
    unique: [true, "PartNo should be unique"],
    required: [true, "Part Field is Required"]
  },
  partName: {
    type: String,
    unique: [true, "PartName should be unique"],
    required: [true, "Part Name is required"]
    
  },
  customer: String,
  operationNo: String

});
partSchema.plugin(uniqueValidator);

module.exports = mongoose.model('part', partSchema);