const nodemailer = require('nodemailer');

const { GMAIL_API_KEY } = process.env;

const nodemailerConfig = {
  servise: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'abaranenko400@gmail.com',
    pass: GMAIL_API_KEY,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async data => {
  const email = { ...data, from: 'abaranenko400@gmail.com' };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
