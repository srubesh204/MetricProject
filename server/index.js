//importing packages here
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
<<<<<<< HEAD
const departmentRoute = require("./routes/departmentRoute")
const designationRoute = require("./routes/designationRoute")
const employeeRoute = require("./routes/employeeRoute")
const generalRoute = require("./routes/generalRoute")
=======

const designationRoute = require("./routes/designationRoute");
const departmentRoute = require("./routes/departmentRoute");
>>>>>>> origin
//
mongoose.connect('mongodb://localhost/metric',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  });
//assinging the package 

const app = express(); 
app.use(cors());
app.use(bodyParser.json());

<<<<<<< HEAD
app.use('/department', departmentRoute);
app.use('/designations', designationRoute);
app.use('/employee', employeeRoute);
app.use('/stateAndCity', generalRoute);

const port = 8080;
=======

app.use('/department', departmentRoute);
app.use('/designation', designationRoute);

const port = 3001;
>>>>>>> origin
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});