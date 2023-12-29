const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const mailConfigSchema = new mongoose.Schema({
 
  
  mailId : String,
  password : String,
  portNumber : String,
  inMailServer : String,
  outMainServer : String

   
});
mailConfigSchema.plugin(uniqueValidator);
module.exports = mongoose.model('mailConfig',mailConfigSchema);
