const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  partNo: String,
  partName: String,
  customer: String,
  operationNo: String
  
});

module.exports = mongoose.model('part', partSchema);