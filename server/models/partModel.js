const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const partSchema = new mongoose.Schema({
  partNo: {
    type: String,
    unique: [true, "PartNo should be unique"],
    required: [true, "PartNo is Required"]
  },
  partName: {
    type: String,
    required: {
      type: String,
      required: [true, "PartName is Required"]
    }
  },
  customer: {
    type: String,
    required: [true, "Customer is Required"]

  },
  partPlant: {
    type: String,
    required: [true, "Plant Required"]
  },
  operationNo: String,
  partStatus: {
    type: String,
    required: [true, "Part Status Required"]
  },

});
partSchema.plugin(uniqueValidator);
partSchema.plugin(mongooseSequence, { inc_field: 'partId' });

module.exports = mongoose.model('part', partSchema);