const nodemailer = require("nodemailer");
const CredentialsManager = require('../utils/credentialsManager');
const credentialsManager = new CredentialsManager();
const host = "smtp.gmail.com";

async function sendSmtpMessage(to, subject, textAsHtml, hostname = host, port = 465, secure = true) {
    const credentials = credentialsManager.getIndexCreds();
    const transporter = nodemailer.createTransport({
        host: credentials.smtp.ip,
        port: credentials.smtp.port,
        secure: credentials.smtp.secure == 'on',
        auth: {
            user: credentials.email,
            pass: credentials.password
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    const message = {
        from: credentials.email,
        to: to,
        subject: subject,
        text: textAsHtml.replace(/<[^>]+>/g, ''),
        html: textAsHtml
    }

    const response = await transporter.sendMail(message);
    console.log(response);
}

module.exports = {
    sendSmtpMessage
};