const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const placeOfUsageSchema = new mongoose.Schema({
  placeOfUsage: {
    type: String,
    unique: [true, "Place Of Usage should be Unique"],
    required: [true, "place Of Usage is Required"],
  },
  placeOfUsageStatus:String,
});
placeOfUsageSchema.plugin(uniqueValidator);

module.exports = mongoose.model('placeOfUsage', placeOfUsageSchema); 