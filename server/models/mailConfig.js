const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
  '31048802288-i0ba9tlnk11kterjk558hlf4jnspi3k8.apps.googleusercontent.com', //
  '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',
  'urn:ietf:wg:oauth:2.0:oob'
);

oAuth2Client.setCredentials({
  refresh_token: '1//04xpqqAHFp4ZqCgYIARAAGAQSNwF-L9Irt2OerUtkT476zk4fp6KRVc9FD4B7kiTa3M2-l1GwaPvkZ9J3lmkUOvsBrWECPhSC5-8',
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'calsoftmetric@gmail.com', // Your Gmail email address
    clientId: '31048802288-i0ba9tlnk11kterjk558hlf4jnspi3k8.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken: '1//04xpqqAHFp4ZqCgYIARAAGAQSNwF-L9Irt2OerUtkT476zk4fp6KRVc9FD4B7kiTa3M2-l1GwaPvkZ9J3lmkUOvsBrWECPhSC5-8',
    accessToken: oAuth2Client.getAccessToken(),
  },
});

module.exports = transporter;
