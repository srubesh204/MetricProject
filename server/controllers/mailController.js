// const unitModel = require("../models/unitModel")
// const excelToJson = require('convert-excel-to-json');

// const transporter = require('../models/mailConfig');

// const unitController = {
//   mailSender: async (req, res) => {
//     const mailOptions = {
//       from: 'calsoftmetric@gmail.com',
//       to: 'srubesh204@gmail.com',
//       subject: 'Test Mail from calsoft',
//       text: 'Hi im test mail from cal soft',
//     };
  
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         res.status(500).send('Error sending email');
//       } else {
//         console.log('Email sent:', info.response);
//         res.status(200).send('Email sent successfully');
//       }
//     });
//   },
 
  


// }


// module.exports = unitController;