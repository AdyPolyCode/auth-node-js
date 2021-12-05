const nodemailer = require('nodemailer');
const { CustomError } = require('../errors');

const options = {
    'mail-confirmation': {
        host: `${process.env.NODE_HOST}:${process.env.NODE_PORT}`,
        path: '/api/auth/mail-confirmation',
        message: 'Please confirm this email so you can enjoy our services - ',
    },
    'password-reset': {
        host: `${process.env.NODE_HOST}:${process.env.NODE_PORT}`,
        path: '/api/auth/password-reset',
        message: 'Here is your reset password email - ',
    },
};

const sendEmail = async (email, type, tokenString) => {
    try {
        const { host, path } = options[type];

        const url = `http://${host}${path}/${tokenString}`;

        const message = options[type].message.concat(url);

        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        await transport.sendMail({
            from: process.env.MAIL_FROM,
            to: email,
            subject: type,
            text: message,
        });

        return url;
    } catch (error) {
        throw new CustomError('Could not send the email', 500);
    }
};

const mailService = { sendEmail };

module.exports = mailService;
