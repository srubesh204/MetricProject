//importing packages here
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');

const designationRoute = require("./routes/designationRoute")
const departmentRoute = require("./routes/departmentRoute")
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

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});