const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const testSchema = new mongoose.Schema({
    albumId: String,
    id: String,
    title: String,
    url: String,
    thumbnailUrl: String
  },);
testSchema.plugin(uniqueValidator);

module.exports = mongoose.model('test', testSchema);