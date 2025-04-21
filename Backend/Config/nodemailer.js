// utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lmejiamartinez25@gmail.com',
        pass: 'gnys pozk dnqy hfcl',
    },
});

module.exports = transporter;
