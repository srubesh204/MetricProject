const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const versionSchema = new mongoose.Schema({
 
  versionNo : String,
  versionRelDate : String,
  lastVersion : String,
  versionChange : String,
  additionFeatures : String

   
});
versionSchema.plugin(uniqueValidator);
module.exports = mongoose.model('version',versionSchema);