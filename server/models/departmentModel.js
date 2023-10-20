const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  department: String,
  area: String,
  placeOfUsage: String
});

module.exports = mongoose.model('Department', departmentSchema);
