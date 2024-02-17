const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const compDetailsSchema = new mongoose.Schema({

  _id : {type: String, default: "companyData"},
  userType: String,
  companyName: String,
  companyAddress: String,
  companyLogo: String,
  companyImage: String

});

const plantSchema = new mongoose.Schema({
  plantName: {
    type: String,
    required: [true, "Plant Name required"],
    unique: [true, "Plant Name should be unique"]
  },
  plantAddress: {
    type: String,
    required: [true, "Plant Address required"]
  },
});

plantSchema.plugin(uniqueValidator);
plantSchema.plugin(mongooseSequence, { inc_field: 'plantId', });
exports.plantSchema = mongoose.model('plants', plantSchema);


compDetailsSchema.plugin(uniqueValidator);
exports.compDetailsSchema = mongoose.model('compDetails', compDetailsSchema);