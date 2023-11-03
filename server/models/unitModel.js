const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const unitSchema = new mongoose.Schema({
  unitName: {
    type: String,
    unique: [true, "UnitName should not be Same"],
    required: [true, "Unit Name is Required"]
  }  
});
unitSchema.plugin(uniqueValidator);

module.exports = mongoose.model('unit', unitSchema);