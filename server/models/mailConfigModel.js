const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const mailConfigSchema = new mongoose.Schema({
 
  _id : {type: String, default: "mailData"},
  mailId : String,
  mailPassword : String,
  portNumber : String,
  inMailServer : String,
  outMailServer : String,
  mailSubjects: [],
  mailBodies: [],
  autoAlert: {
    type : String,
    default: "no"
  }

   
});
mailConfigSchema.plugin(uniqueValidator);
module.exports = mongoose.model('mailConfig',mailConfigSchema);
