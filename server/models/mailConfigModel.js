const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const mailConfigSchema = new mongoose.Schema({
 
  mailFixedId: Number,
  mailId : String,
  mailPassword : String,
  portNumber : String,
  inMailServer : String,
  outMailServer : String,
  mailSubjects: [],
  mailBodies: []

   
});
mailConfigSchema.plugin(uniqueValidator);
module.exports = mongoose.model('mailConfig',mailConfigSchema);
