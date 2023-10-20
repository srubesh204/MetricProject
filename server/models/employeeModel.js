const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    employeeCode : String,
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
    mailId : String,
    doj : String,
    employmentStatus : String,
    reportTo : String
});

module.exports = mongoose.model('employees', employeeSchema);