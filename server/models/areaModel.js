const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const areaSchema = new mongoose.Schema({

  area: {
    type: String,
    unique: [true, "Area should be Unique"],
    required: [true, "Area is Required"]
  },
  areaStatus: {
    type: String
  }

    
});
areaSchema.plugin(uniqueValidator);

module.exports = mongoose.model('area', areaSchema);