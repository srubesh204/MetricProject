const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema({
 
  designation: String,  
});

module.exports = mongoose.model('designations', designationSchema);

