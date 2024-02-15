const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const measurementUncertaintySchema = new mongoose.Schema({
   uncItemName: String,
   uncRangeSize: String,
   uncRangeSizeUnit: String,
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
   uncTI: String,
   uncR1: String,
   uncR2: String,
   uncR3: String,
   uncR4: String,
   uncR5: String,
   uncR6: String,
   uncR7: String,
   uncR8: String,
   uncR9: String,
   uncR10: String,
   uncStdDeviation: String,
   uncN: String,
   combinedUnc: String,
   uncCoverageFactor: String,
   uncDegOfFreedom: String,
   uncUncertainity: String,
   uncTypeBResult: []
});
measurementUncertaintySchema.plugin(uniqueValidator);

module.exports = mongoose.model('measurementUncertainty', measurementUncertaintySchema);