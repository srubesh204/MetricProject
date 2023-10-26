const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const employeeSchema = new mongoose.Schema({
    employeeCode : {
        type: String,
        unique: true,
        required: true
    },
    title : String,
    firstName : String,
    lastName : String,
    dob : String,
    address : String,
    city : String,
    state : String,
    contactNumber : String,
    designation : String,
    department : String,
    mailId : {
        type: String,
        unique: true,
        required: true
    },
    doj : String,
    employmentStatus : String,
    reportTo : String
});
employeeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('employee', employeeSchema);