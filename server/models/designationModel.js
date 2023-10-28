const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const designationSchema = new mongoose.Schema({
 
  designation:{
  type: String,
    unique: true,
    required: [true, "Designation must"]
     
  }
});
designationSchema.plugin(uniqueValidator);
module.exports = mongoose.model('designation', designationSchema);

