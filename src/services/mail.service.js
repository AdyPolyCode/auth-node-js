const nodemailer = require('nodemailer');
const hbs = require('handlebars');
const { dirname, join } = require('path');
const { readFileSync } = require('fs');
const { CustomError } = require('../errors');
const messageQueueService = require('./message-queue.service');

const root = dirname(__dirname);

const options = {
    'mail-confirmation': {
        host: `${process.env.NODE_HOST}:${process.env.NODE_PORT}`,
        urlPath: '/api/auth/mail-confirmation',
        templatePath: join(root, 'templates/mail-confirmation.hbs'),
        message: 'Please confirm this email so you can enjoy our services - ',
        queueName: 'confirmation',
    },
    'password-reset': {
        host: `${process.env.NODE_HOST}:${process.env.NODE_PORT}`,
        urlPath: '/api/auth/password-reset',
        templatePath: join(root, 'templates/password-reset.hbs'),
        message: 'Here is your reset password email - ',
        queueName: 'reset',
    },
};

const sendEmail = async (email, type, tokenString) => {
    try {
        const { host, urlPath, templatePath, queueName } = options[type];

        const url = `http://${host}${urlPath}/${tokenString}`;

        const templateFile = readFileSync(templatePath, {
            encoding: 'utf-8',
        });

        const template = hbs.compile(templateFile)({ URL: url });

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

        await messageQueueService.publish(
            {
                from: process.env.MAIL_FROM,
                to: email,
                subject: type,
                text: message,
                html: template,
            },
            {
                severity: type,
            }
        );

        await messageQueueService.subscribe(transport, {
            queueName,
            severity: type,
        });

        return url;
    } catch (error) {
        throw new CustomError('Cannot send email', 500);
    }
};

const mailService = { sendEmail };

module.exports = mailService;
