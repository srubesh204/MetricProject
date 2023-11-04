const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const departmentSchema = new mongoose.Schema({
  department: {
    type: String,
    unique: [true, "Department should be Unique"],
    required: [true, "Department is Required"]
   
  },
 
  defaultdep: String
});
departmentSchema.plugin(uniqueValidator);
module.exports = mongoose.model('departments', departmentSchema);