const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const formatNoSchema = new mongoose.Schema({
 
  
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
  fCertificatePrefix : String,
  fDeTemperature : String,
  fDeHumidity : String
   
});
formatNoSchema.plugin(uniqueValidator);
module.exports = mongoose.model('formatNo',formatNoSchema);