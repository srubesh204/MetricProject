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
const measurementUncertaintyRoute = require("./routes/measurementUncertaintyRoute");
const uncMaterialCteRoute = require('./routes/uncMaterialCteRoute')
const uncTypeBRoute = require('./routes/uncTypeBRoute')
const pdfmake = require('pdfmake');
//const pdfFonts = require('./vfs_fonts');

const pdfPrinter = require('pdf-to-printer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const childProcess = require('child_process');

//const printer = require('node-printer');


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
app.use('/additionalCertificates', express.static('storage/additionalCertificates'));
app.use('/grnCertificates', express.static('storage/grnItemCertificates'));
app.use('/itemMasterImages', express.static('storage/Images/itemMasterImages'));
app.use('/dcCertificate', express.static('storage/dcCertificate'));
app.use('/grnCertificates', express.static('storage/grnCertificates'));
app.use('/calCertificates', express.static('storage/calCertificates'));
app.use('/uncertaintyCertificates', express.static('storage/uncertaintyCertificates'));
app.use('/logo', express.static('storage/logo'));
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
app.use('/measurementUncertainty', measurementUncertaintyRoute)
app.use('/unc', measurementUncertaintyRoute)
app.use('/unc', uncMaterialCteRoute)
app.use('/unc', uncTypeBRoute)

//
app.post('/login', employeeController.employeeLoginCheck)


app.get('/print', (req, res) => {
  // Your JSON data
  const data = [
    { id: 'MP/DI/110', calDate: '22-Mar-23', nextDue: '21-Mar-24' },
    { id: 'MP/DI/148', calDate: '22-Mar-23', nextDue: '21-Mar-24' },
    // Add more objects as needed
  ];

  // Convert dimensions from mm to points (1 inch = 25.4 mm = 72 points)
  const labelWidth = 40 / 25.4 * 72;
  const labelHeight = 15 / 25.4 * 72;

  // Create a new PDF document
  const doc = new PDFDocument({ autoFirstPage: false });

  // For each item in the data array
  data.forEach((item, index) => {
    // Add a new page for each item
    doc.addPage({
      size: [labelWidth, labelHeight],
      margins: { top: 0, bottom: 0, left: 0, right: 0 }
    });

    // Write the item's details
    doc.fontSize(8).text(`ID No : ${item.id}`, 0, 0);
    doc.fontSize(8).text(`Cal Date : ${item.calDate}`, 0, 5);
    doc.fontSize(8).text(`Next Due : ${item.nextDue}`, 0, 10);
  });

  // Pipe its output somewhere, like to a file or HTTP response
  // This is required before ending the document
  const writeStream = fs.createWriteStream('output.pdf');
  doc.pipe(writeStream);

  // Finalize the PDF file
  doc.end();

  writeStream.on('finish', () => {
    // Print the PDF
    pdfPrinter
      .print('output.pdf', { printerName: 'TSC TE210' })
      .then(() => {
        console.log('File printed successfully.');
        res.send('File printed successfully.');
      })
      .catch((err) => {
        console.error('Error printing file:', err);
        res.status(500).send('Error printing file.');
      });
  });
});

app.listen(process.env.SERVER_PORT_NO || 3003, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT_NO}`);
});