const unitModel = require("../models/unitModel")
const excelToJson = require('convert-excel-to-json');
const nodemailer = require("nodemailer");
require('dotenv').config();
//const transporter = require('../models/mailConfig');

const transporter1 = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

const mailController = {
    mailSender: async (req, res) => {
        const { to, subject, mailBody, cc, selectedItems } = req.body;
        console.log(selectedItems)
        // Mapping the selectedItems array to HTML rows
        const itemsRows = selectedItems.map((item, index) => `
        <tr>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${index + 1}</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemAddMasterName}</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemIMTENo}</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemRangeSize + " " + item.itemRangeSizeUnit}</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemCurrentLocation}</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemCalDate}</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemDueDate}</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemCalibrationSource}</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemSupplier.join(", ")}</td>
        </tr>
    `).join('');

        // Constructing the mailOptions with the dynamically generated rows
        const mailOptions = {
            from: 'calsoftmetric@gmail.com',
            to: to,
            subject: subject,
            text: mailBody,
            html: `
            <!DOCTYPE html>
            <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
                <!-- ... (your existing head content) ... -->
            </head>
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                }

                th, td {
                    border: 1px solid #dddddd;
                    text-align: center;
                    padding: 8px;
                }

                th {
                    background-color: #f2f2f2;
                }
            </style>

            <body style="margin:0;padding:0;">
                <p>${mailBody}</p>
                <table role="presentation" style="width:100%; border-collapse:collapse; border: 1px solid black; border-spacing:0; background:#ffffff;">
                    <tbody>
                        <tr>
                            <th style="border: 1px solid #dddddd; text-align: center; padding: 8px; background-color: #f2f2f2;">Si No</th>
                            <th style="border: 1px solid #dddddd; text-align: center; padding: 8px; background-color: #f2f2f2;">Item Name</th>
                            <th style="border: 1px solid #dddddd; text-align: center; padding: 8px; background-color: #f2f2f2;">IMTE No</th>
                            <th style="border: 1px solid #dddddd; text-align: center; padding: 8px; background-color: #f2f2f2;">Range/Size</th>
                            <th style="border: 1px solid #dddddd; text-align: center; padding: 8px; background-color: #f2f2f2;">Current Location</th>
                            <th style="border: 1px solid #dddddd; text-align: center; padding: 8px; background-color: #f2f2f2;">Cal Date</th>
                            <th style="border: 1px solid #dddddd; text-align: center; padding: 8px; background-color: #f2f2f2;">Due Date</th>
                            <th style="border: 1px solid #dddddd; text-align: center; padding: 8px; background-color: #f2f2f2;">Cal Source</th>
                            <th style="border: 1px solid #dddddd; text-align: center; padding: 8px; background-color: #f2f2f2;">Supplier</th>
                        </tr>
                        ${itemsRows}
                        
                    </tbody>
                </table>
            </body>
            </html>`,
            cc: cc
        };

        // Rest of your mail-sending logic...



        transporter1.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent:', info.response);
                res.status(200).send('Email sent successfully');
            }
        });
    },




}


module.exports = mailController;