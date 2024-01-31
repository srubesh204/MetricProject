//importing packages here
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./connectionString')

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
const placeOfUsageRoute = require('./routes/placeOfUsageRoute');
const itemCalRoute = require("./routes/itemCalRoute");
const testRoute = require("./routes/testRoute");
const itemGRNRoute = require("./routes/itemGRNRoute");
const onsiteItemGRNRoute = require("./routes/onsiteItemGRNRoute");
const itemDcRoute = require("./routes/itemDcRoute");
const mailConfigRoute = require("./routes/mailConfigRoute");
const backupRoutes = require("./routes/backupRoutes");
const versionRoute = require("./routes/versionRoute");
const compDetailsRoute = require("./routes/compDetailsRoute");
const formatNoRoute = require("./routes/formatNoRoute");
const employeeController = require("./controllers/employeeController");
const mailRoute = require("./routes/mailRoute");
const itemHistoryRoute = require("./routes/itemHistoryRoute")

db.connectDatabase();
//

//assinging the package 

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

app.use('/department', departmentRoute);
app.use('/designation', designationRoute);
app.use('/employee', employeeRoute);
app.use('/general', generalRoute);
app.use('/unit', unitRoute);
app.use('/part', partRoute);
app.use('/vendor', vendorRoute);
app.use('/itemMaster', itemMasterRoute);
app.use('/onsiteItemGRN', onsiteItemGRNRoute);
app.use('/test', testRoute);
app.use('/upload', uploadRoute);
app.use('/vendorCertificates', express.static('storage/vendorCertificates'));
app.use('/workInstructions', express.static('storage/workInstructions'));
app.use('/itemCertificates', express.static('storage/itemCertificates'));
app.use('/grnCertificates', express.static('storage/grnItemCertificates'));
app.use('/itemMasterImages', express.static('storage/Images/itemMasterImages'));
app.use('/icon', express.static('storage/icons'));
app.use('/error', express.static('storage/Images/errorImages'));
app.use('/itemAdd', itemAddRoute);
app.use('/itemHistory', itemHistoryRoute);
app.use('/itemCal', itemCalRoute);
app.use('/itemGRN', itemGRNRoute);
app.use('/itemDc', itemDcRoute);
app.use('/area', areaRoute);
app.use('/version', versionRoute);
app.use('/backup', backupRoutes);
app.use('/formatNo', formatNoRoute);
app.use('/compDetails', compDetailsRoute);
app.use('/placeOfUsage', placeOfUsageRoute);
app.use('/mailConfig', mailConfigRoute);
app.use('/mail', mailRoute)
 
//
app.post('/login', employeeController.employeeLoginCheck)
const port = 3003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});