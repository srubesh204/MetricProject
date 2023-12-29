const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const mailConfigSchema = new mongoose.Schema({
 
  
  mailId : String,
  mailPassword : String,
  portNumber : String,
  inMailServer : String,
  outMailServer : String

   
});
mailConfigSchema.plugin(uniqueValidator);
module.exports = mongoose.model('mailConfig',mailConfigSchema);
