const cron = require('node-cron');
const nodemailer = require('nodemailer');
const mailConfigModel = require('./models/mailConfigModel');
const itemAddModel = require('./models/itemAddModel') // Assuming you have a function to find expiring items
const dayjs = require('dayjs')

// Schedule cron job to run every morning at 9:00 AM
cron.schedule('* * * * *', async () => {
    try {
        // Add logic to check for expiring items here
        const sevenDaysAgo = dayjs().add(7, 'day');
        const itemPlants = await itemAddModel.aggregate([{
            $match: {
              "itemPlant": { $in: allowedPlants ? allowedPlants : [] } // Specify the values to match
            }
          }, { $sort: { itemAddMasterName: 1, itemIMTENo: 1 } }
        ]);
            

        // Find items where itemDueDate is between the current date and 7 days ago
        const expiringItems = await itemAddModel.find({
            itemDueDate: {
                $gte: dayjs().format('YYYY-MM-DD'), // Greater than or equal to 7 days ago
                $lte: sevenDaysAgo.format('YYYY-MM-DD') // Less than or equal to current date
            }
        });
        console.log(expiringItems)
        // Implement this function to filter expiring items

        // If there are expiring items, send email notifications
        if (expiringItems.length > 0) {
            // Fetch mail details from database
            const mailDetails = await mailConfigModel.findById("mailData");
            if (!mailDetails) {
                console.error("Mail details not found!");
                return;
            }

            // Initialize Nodemailer transporter
            const transporter = nodemailer.createTransport({
                host: mailDetails.outMailServer,
                port: mailDetails.portNumber,
                secure: true,
                auth: {
                    user: mailDetails.mailId,
                    pass: mailDetails.mailPassword,
                },
            });

            // Construct email options
            const mailOptions = {
                from: mailDetails.mailId,
                to: 'rbmkrishh@gmail.com', // Add recipient email address
                subject: 'Instrument Expiry Alert',
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
    
                <p>This is to inform you that the following instruments are expiring in 7 days:<p>
                    
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
                            ${generateItemsList(expiringItems)}
                            
                        </tbody>
                    </table>
    
                   
                  
                   
                    <p style="font-weight: 700">This is system generated email. Do not reply to this email.</p>  
            <code>The information in this message and any files transmitted with it are confidential and may be legally privileged. 
            It is intended solely for the addressee. Access to this message by anyone else is unauthorized. 
            If you are not the intended recipient, you are notified that any disclosure, copying, or distribution of the message, or any action or omission taken by you in reliance on it, is strictly prohibited and may be unlawful. 
            Please contact the sender immediately if you have received this message in error and promptly destroy the original communication.</code>
                    
                </body>
                </html>`
                
            };

            // Send email notifications
            await transporter.sendMail(mailOptions);
            console.log('Email notifications sent successfully');
        }
    } catch (error) {
        console.error('Error sending email notifications:', error);
    }
});

// Function to generate HTML list of expiring items
function generateItemsList(expiringItems) {
    return expiringItems.map((item, index) => `
    <tr>
        <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${index + 1}</td>
        <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemAddMasterName ? item.itemAddMasterName : "-"}</td>
        <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemIMTENo ? item.itemIMTENo : "-"}</td>
        <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${(item.itemRangeSize ? item.itemRangeSize : "-") + " " + (item.itemRangeSizeUnit ? item.itemRangeSizeUnit : "")}</td>
        <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemCurrentLocation ? item.itemCurrentLocation : "-"}</td>
        <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemCalDate ? item.itemCalDate : "-"}</td>
        <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemDueDate ? item.itemDueDate : "-"}</td>
        <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemCalibrationSource ? item.itemCalibrationSource : "-"}</td>
        <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${item.itemSupplier.join(", ") ? item.itemSupplier.join(", ") : "-"}</td>
    </tr>
`).join('');
}

module.exports = cron; // Export the cron job for use in other files
