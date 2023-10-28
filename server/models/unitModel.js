const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const unitSchema = new mongoose.Schema({
  unitName: {
    type: String,
    unique: true,
    required: [true, "Unit must"]
  }  
});
unitSchema.plugin(uniqueValidator);

module.exports = mongoose.model('unit', unitSchema);