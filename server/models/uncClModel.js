const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const uncClSchema = new mongoose.Schema({
    clccf_id: String,
    degrees_freedom: String,
    fraction_percent: String 
});
uncClSchema.plugin(uniqueValidator);

module.exports = mongoose.model('unccl', uncClSchema);