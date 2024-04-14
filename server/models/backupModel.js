const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const backUpSchema = new mongoose.Schema({

  backId: String,
  path: String,
  date: String,
  restoreDate: String,
  time: String,
  backupName: String



});
backUpSchema.plugin(uniqueValidator);
module.exports = mongoose.model('backup', backUpSchema);