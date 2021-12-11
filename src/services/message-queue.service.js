const amqp = require('amqplib');

/* eslint-disable */
const send = async (data) => {
    try {
        const message = JSON.stringify(data);

        const connection = await amqp.connect(process.env.RABBIT_URL);

        const channel = await connection.createChannel();

        channel.assertQueue(process.env.RABBIT_QUEUE, { durable: true });

        channel.sendToQueue(process.env.RABBIT_QUEUE, Buffer.from(message), {
            contentType: 'application/json',
        });
    } catch (error) {
        throw error;
    }
};

const receive = async (data) => {
    try {
        const connection = await amqp.connect(process.env.RABBIT_URL);

        const channel = await connection.createChannel();

        channel.assertQueue(process.env.RABBIT_QUEUE, { durable: true });

        channel.consume(process.env.RABBIT_QUEUE, async (msg) => {
            const options = JSON.parse(msg.content.toString());

            try {
                await data.sendMail(options);

                channel.ack(msg);
            } catch (error) {
                channel.nack(msg);

                throw error;
            }
        });
    } catch (error) {
        throw error;
    }
};
/* eslint-enable */

const messageQueueService = {
    send,
    receive,
};

module.exports = messageQueueService;
