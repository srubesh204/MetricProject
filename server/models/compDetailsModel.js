const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const compDetailsSchema = new mongoose.Schema({

  compId: {
    type: String,
    default: 1
  },
  userType: String,
  companyName: String,
  companyAddress: String,
  companyLogo: String,
  companyImage: String

});

const plantSchema = new mongoose.Schema({
  compId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'compDetails', // Reference to the compDetailsSchema model
  },
  plantName: String,
  plantAddress: String,
  admins: [],
  plantAdmins: [],
  creators: [],
  viewers: []
});

plantSchema.plugin(uniqueValidator);
exports.plantSchema = mongoose.model('plants', plantSchema);


compDetailsSchema.plugin(uniqueValidator);
exports.compDetailsSchema = mongoose.model('compDetails', compDetailsSchema);