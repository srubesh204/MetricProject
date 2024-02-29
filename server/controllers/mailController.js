const unitModel = require("../models/unitModel")
const excelToJson = require('convert-excel-to-json');
const nodemailer = require("nodemailer");
const { compDetailsSchema, plantSchema } = require("../models/compDetailsModel");
const mailConfigModel = require("../models/mailConfigModel");
require('dotenv').config();
//const transporter = require('../models/mailConfig');

const mailData = async () => {
    return await mailConfigModel.findById("mailData");
}

const createTransporter = async () => {
    const mailDetails = await mailData();
    if (!mailDetails) {
        console.error("Mail details not found!");
        return null;
    }

    return nodemailer.createTransport({
        host: mailDetails.outMailServer,
        port: mailDetails.portNumber,
        secure: true,
        auth: {
            user: mailDetails.mailId,
            pass: mailDetails.mailPassword,
        },
    });
};
const mailController = {
    mailSender: async (req, res) => {
        try {
            const mailDetails = await mailData();
            const { to, subject, mailBody, departmentCc, vendorCc, bcc , selectedItems, employee } = req.body;
            const compDetails = await compDetailsSchema.findById("companyData");
            console.log(compDetails)
            const plantDetails = await plantSchema.find({plantName: selectedItems[0].itemPlant})
            console.log(plantDetails)
            const ccs = [...new Set([...vendorCc, ...departmentCc])]
            console.log(ccs)
            // console.log(plantDetails)
            // console.log(selectedItems)
            // Mapping the selectedItems array to HTML rows
    
            const systemGeneratedText = `
            <p style="font-weight: 700">This is system generated email. Do not reply to this email.</p>  
            <code>The information in this message and any files transmitted with it are confidential and may be legally privileged. 
            It is intended solely for the addressee. Access to this message by anyone else is unauthorized. 
            If you are not the intended recipient, you are notified that any disclosure, copying, or distribution of the message, or any action or omission taken by you in reliance on it, is strictly prohibited and may be unlawful. 
            Please contact the sender immediately if you have received this message in error and promptly destroy the original communication.</code>
            `;
        
           
    
            const itemsRows = selectedItems.map((item, index) => `
            <tr>
                <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${index + 1}</td>
                <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemAddMasterName ? item.itemAddMasterName : "-"}</td>
                <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemIMTENo ? item.itemIMTENo : "-"}</td>
                <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${(item.itemRangeSize ? item.itemRangeSize : "-") + " " + (item.itemRangeSizeUnit ? item.itemRangeSizeUnit : "")}</td>
                <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemCurrentLocation ? item.itemCurrentLocation : "-"}</td>
                <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemCalDate ? item.itemCalDate : "-"}</td>
                <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemDueDate ? item.itemDueDate : "-"}</td>
                <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemCalibrationSource ? item.itemCalibrationSource : "-"}</td>
                <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemSupplier.join(", ")? item.itemSupplier.join(", ") : "-"}</td>
            </tr>
        `).join('');
    
            // Constructing the mailOptions with the dynamically generated rows
            const mailOptions = {
                from: mailDetails.mailId,
                to: to,
                subject: subject,
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
                <p>Dear Sir/Madam,</p>
    
                <p>${mailBody ? mailBody : "-"}</p>
                    
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
    
                   
                    <p>Thanks with Regards<br>
                    ${employee && employee.firstName ? employee.firstName : ""} ${employee && employee.lastName ? employee.lastName : ""} - ${employee && employee.designation ? employee.designation : ""}<br>
                    ${compDetails && compDetails.companyName}<br>
                    ${plantDetails.length > 0 && plantDetails[0].plantName ? plantDetails[0].plantName : ""} - ${plantDetails.length > 0 && plantDetails[0].plantAddress ? plantDetails[0].plantAddress : ""}</p>
                    <br>
                   
                    ${systemGeneratedText}
                    
                </body>
                </html>`,
                cc: ccs,
                bcc : bcc
            };
    
            // Rest of your mail-sending logic...
            createTransporter().then(transporter1 => {
                if (!transporter1) {
                    // Handle error
                    return;
                }
            
                // Use transporter1 for sending emails
                // For example:
                transporter1.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                        res.status(500).send('Error sending email');
                    } else {
                        console.log('Email sent:', info.response);
                        res.status(200).send('Email sent successfully');
                    }
                });
            });
        }catch(err){
            console.log(err)
            res.status(500).json({ error: 'Error sending Mail', status: 0 });
        }
       
    },




}


module.exports = mailController;