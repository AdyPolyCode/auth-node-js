const nodemailer = require('nodemailer');
const { CustomError } = require('../errors');

const sendEmail = async (email, type, data) => {
    try {
        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const message = await transport.sendMail({
            from: process.env.MAIL_FROM,
            to: email,
            subject: type,
            text: data,
        });
    } catch (error) {
        throw new CustomError('Could not send email', 500);
    }
};

const generateUrl = (options, type, tokenString) => {
    const { host, path } = options;

    const confirmUrl = `http://${host}${path}/${tokenString}`;

    let message;

    if (type === 'mail-confirmation') {
        message = 'Please confirm this email so you can enjoy our services - ';
    } else if (type === 'password-reset') {
        message = 'Here is your reset password email - ';
    }

    message = message.concat(confirmUrl);

    return message;
};

const mailService = { sendEmail, generateUrl };

module.exports = mailService;
