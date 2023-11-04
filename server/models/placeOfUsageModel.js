const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const placeOfUsageSchema = new mongoose.Schema({
  placeOfUsage: String
    
});
//unitSchema.plugin(uniqueValidator);

module.exports = mongoose.model('placeOfUsage', placeOfUsageSchema);