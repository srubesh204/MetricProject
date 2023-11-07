const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const areaSchema = new mongoose.Schema({
  area: {
    type: String,
    
  }
    
});
//unitSchema.plugin(uniqueValidator);

module.exports = mongoose.model('area', areaSchema);