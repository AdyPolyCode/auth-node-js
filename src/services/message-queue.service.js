const amqp = require('amqplib/callback_api');
const mailService = require('./mail.service');

/* eslint-disable */
const send = (data) => {
    amqp.connect((err, connection) => {
        if (err) throw err;

        connection.createChannel((err, channel) => {
            if (err) throw err;

            channel.assertQueue(
                process.env.RABBIT_QUEUE,
                { durable: true },
                (err, ok) => {
                    if (err) throw err;
                }
            );

            const message = JSON.stringify(data);

            channel.sendToQueue(
                process.env.RABBIT_QUEUE,
                Buffer.from(message),
                { contentType: 'application/json' }
            );
        });
    });
};

const receive = () => {
    amqp.connect((err, connection) => {
        if (err) throw err;

        connection.createChannel((err, channel) => {
            if (err) throw err;

            channel.assertQueue(
                process.env.RABBIT_QUEUE,
                { durable: true },
                (err, ok) => {
                    if (err) throw err;
                }
            );

            channel.consume(
                process.env.RABBIT_QUEUE,
                async (msg) => {
                    const { email, type, tokenString } = JSON.parse(
                        msg.content.toString()
                    );

                    try {
                        await mailService.sendEmail(email, type, tokenString);

                        channel.ack(msg);
                    } catch (error) {
                        channel.nack(msg);
                        throw error;
                    }
                },
                { noAck: false }
            );
        });
    });
};
/* eslint-enable */

const messageQueueService = {
    send,
    receive,
};

module.exports = messageQueueService;
