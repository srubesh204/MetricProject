const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  unitName: String
  
});

module.exports = mongoose.model('unit', unitSchema);