const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const departmentSchema = new mongoose.Schema({
  department: {
    type: String,
    unique: [true, "Department should be Unique"],
    required: [true, "Department is Required"]  
  },
  departmentStatus:String,
  departmentPlant: {
    type: [],
    required: [true, "Plant required"]
  },
  defaultdep: String
});
departmentSchema.plugin(uniqueValidator);
departmentSchema.plugin(mongooseSequence, { inc_field: 'departmentId', prefix: 'SBCDEP' });
module.exports = mongoose.model('departments', departmentSchema);