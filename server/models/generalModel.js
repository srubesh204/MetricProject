const mongoose = require('mongoose');

const stateAndCity = new mongoose.Schema({
  id: Number, 
  name : String,
  state : String 
});

module.exports = mongoose.model('stateAndCity', stateAndCity);
