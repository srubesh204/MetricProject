const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const formatNoSchema = new mongoose.Schema({
  _id: {type:String, default: "formatNo"},
  
  fDc : {
    frNo:String,
    amNo:String,
    amDate:String,
  },
  fGrn: {
    frNo:String,
    amNo:String,
    amDate:String,
  },
  fCertificate : {
    frNo:String,
    amNo:String,
    amDate:String,
  },
  fHistoryCard :  {
    frNo:String,
    amNo:String,
    amDate:String,
  },
  fTotalList :  {
    frNo:String,
    amNo:String,
    amDate:String,
  },
  fUncDate :  {
    frNo:String,
    amNo:String,
    amDate:String,
  },
  fCommonPrefix : String,
  
   
});
formatNoSchema.plugin(uniqueValidator);
module.exports = mongoose.model('formatNo',formatNoSchema);