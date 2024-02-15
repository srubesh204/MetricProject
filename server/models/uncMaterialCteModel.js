const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const uncMaterialCteSchema = new mongoose.Schema({
    cte_id: String,
    material_name: String,
    material_cte: String,
    cte_unit: String
   
});
uncMaterialCteSchema.plugin(uniqueValidator);

module.exports = mongoose.model('uncmaterialcte', uncMaterialCteSchema);