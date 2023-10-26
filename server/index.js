//importing packages here
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const departmentRoute = require("./routes/departmentRoute")
const designationRoute = require("./routes/designationRoute")
const employeeRoute = require("./routes/employeeRoute")
const generalRoute = require("./routes/generalRoute")
const unitRoute = require("./routes/unitRoute")
const partRoute = require("./routes/partRoute")
const vendorRoute = require("./routes/vendorRoute")
const itemMasterRoute = require("./routes/itemMasterRoute")
//
mongoose.connect('mongodb://localhost/metric',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  });
//assinging the package 

const app = express(); 
app.use(cors());
app.use(bodyParser.json());

app.use('/department', departmentRoute);
app.use('/designation', designationRoute);
app.use('/employee', employeeRoute);
app.use('/stateAndCity', generalRoute);
app.use('/unit', unitRoute);
app.use('/part', partRoute);
app.use('/vendor', vendorRoute);
app.use('/itemMaster', itemMasterRoute);


const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});