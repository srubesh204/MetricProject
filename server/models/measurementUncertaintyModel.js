const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const measurementUncertaintySchema = new mongoose.Schema({
   uncItemName: String,
   uncRangeSize: String,
   uncLC: String,
   uncMaterial: String,
   uncDate: String,
   uncMasterDetails: [],
   uncStartTemp: String,
   uncEndTemp: String,
   uncMeanTemp: String,
   uncRefTemp: String,
   uncTEMaster: String,
   uncTEDUC: String,
   uncR1: String,
   uncR2: String,
   uncR3: String,
   uncR4: String,
   uncR5: String,
   uncStdDeviation: String,
   uncN: String
});
measurementUncertaintySchema.plugin(uniqueValidator);

module.exports = mongoose.model('measurementUncertainty', measurementUncertaintySchema);