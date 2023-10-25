const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const partSchema = new mongoose.Schema({
  partNo: {
    type: String,
    required: true,
    unique: true,
  },
  partName: {
    type: String,
    required: true
    
  },
  customer: String,
  operationNo: String

});
partSchema.plugin(uniqueValidator);

module.exports = mongoose.model('part', partSchema);