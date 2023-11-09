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
const uploadRoute = require('./routes/uploadRoutes')
const itemAddRoute = require('./routes/itemAddRoute')
const areaRoute = require('./routes/areaRoute')
const placeOfUsageRoute = require('./routes/placeOfUsageRoute')
//
mongoose.connect('mongodb://localhost/metric', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection is open');
});

// Listen for the 'error' event
mongoose.connection.on('error', (err) => {
  console.error(`Mongoose default connection error: ${err}`);
});

// Listen for the 'disconnected' event
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection is disconnected due to application termination');
    process.exit(0);
  });
});
//assinging the package 

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/department', departmentRoute);
app.use('/designation', designationRoute);
app.use('/employee', employeeRoute);
app.use('/general', generalRoute);
app.use('/unit', unitRoute);
app.use('/part', partRoute);
app.use('/vendor', vendorRoute);
app.use('/itemMaster', itemMasterRoute);

app.use('/upload', uploadRoute);
app.use('/vendorCertificates', express.static('storage/vendorCertificates'));
app.use('/itemAdd', itemAddRoute);
app.use('/area', areaRoute);
app.use('/placeOfUsage', placeOfUsageRoute);
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});