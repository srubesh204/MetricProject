const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const areaSchema = new mongoose.Schema({
<<<<<<< HEAD
  area: {
    type: String,
    
  }
=======
  area: String,
  areaStatus:String,
>>>>>>> 7244357623c0b6b16707843eb531937d08bf8be2
    
});
//unitSchema.plugin(uniqueValidator);

module.exports = mongoose.model('area', areaSchema);