const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = "358997962790-jftui9oc1125ioopdmi6cg9so71f5onp.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN = "1//04WjSnn-0SkK8CgYIARAAGAQSNwF-L9IrerVIQmB44YWo-aXIdgZb4eOKpXhdzIiHOjerkYpNFOruZ6oXPaz9M64sQg-4h4D3eOI";
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; // DONT EDIT THIS
const MY_EMAIL = "srubesh204@gmail.com";

/* POPULATE ABOVE FIELDS WITH YOUR CREDENTIALS */

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const getAccessToken = async () => {
  const { token } = await oAuth2Client.getAccessToken();
  return token;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: MY_EMAIL,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: getAccessToken(), // Use a function to get the access token dynamically
  },
  tls: {
    rejectUnauthorized: true,
  },
});

module.exports = transporter;
