const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
 
const uncTypeBSchema = new mongoose.Schema({
    uncertainity_typeb_eval_id: String,
    uncertainity_component: String,
    sensitivity_coefficient: String, 
    type_of_distribution: String,
    probability_distribution: String,
    factor: String,
    factor_root: String 
});

const clccfSchema = new mongoose.Schema({
    clccf_id : String, 
    degrees_freedom : String, 
    fraction_percent : String 
});


exports.uncTypeBModel = mongoose.model('unctypeb', uncTypeBSchema);
exports.clccf = mongoose.model('clccf', clccfSchema);