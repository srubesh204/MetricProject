const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const departmentSchema = new mongoose.Schema({
  department: {
    type: String,
    unique: true,
    required: true
  },
  area: String,
  placeOfUsage: String
});

module.exports = mongoose.model('departments', departmentSchema);
    