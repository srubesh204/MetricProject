const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const employeeSchema = new mongoose.Schema({
    employeeCode : {
        type: String,
        unique: [true, "Employee Code should be unique"],
        required: [true, "Employee Code Required"]
    },
    title : String,
    firstName : {
        type:String,
        required:[true,"FirstName is required  "]
    },
    lastName : {
        type:String,
        required:[true,"LastName is required  "]
    },
    dob : String,
    address : String,
    city : String,
    state : String,
    contactNumber : {
        type: String,
        required: [true, "Phone number is must"],
        minLength: [10, "Phone should be within 10 digits"],
        maxLength: [10, "Phone should not more than 10 digits"]
          
    },
    designation : {
        type: String,
        required : [true, "Designation required"]
    },
    department : {
        type: String,
        required : [true, "Department required"]
    },
    mailId : String,
    empRole: {
        type: String,
        required: [true, "Employee Role is required"]
    },
    doj : String,
    employmentStatus : String,
    reportTo : String,
    password: {
        type: String,
        required: [true, "Password is required"],
        unique: [true, "Password should be unique"]
    },
    plant: {
        type: String,
        // required: [true, "Please select plant"]
    },
    extraPermissions : []
});
employeeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('employee', employeeSchema);