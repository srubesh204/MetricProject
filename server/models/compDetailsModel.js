const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const compDetailsSchema = new mongoose.Schema({
 
  
  userType : String,
  companyName: String,
  companyPlants : [],
  companyLogo : String,
  companyImage : String

   
});
compDetailsSchema.plugin(uniqueValidator);
module.exports = mongoose.model('compDetails',compDetailsSchema);