const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const designationSchema = new mongoose.Schema({
 
  designation:{
  type: String,
  unique: [true, " Designation should be Unique"],
    required: [true, "Designation is Required"],
    
     
  },
  designationStatus: {
    type: String, 
    required: [true, "Designation Status Required"]
  }
});
designationSchema.plugin(uniqueValidator);
designationSchema.plugin(mongooseSequence, { inc_field: 'designationId', });
module.exports = mongoose.model('designation', designationSchema);

