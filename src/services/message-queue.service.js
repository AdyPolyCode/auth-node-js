const amqp = require('amqplib');

/* eslint-disable */
const publish = async (data, options) => {
    try {
        const message = JSON.stringify(data);

        const connection = await amqp.connect(process.env.RABBIT_URL);

        const channel = await connection.createChannel();

        const exchange = await channel.assertExchange('task_e', 'direct', {
            durable: true,
        });

        const queue = await channel.assertQueue(options.queueName, {
            durable: true,
        });

        channel.bindQueue(queue.queue, exchange.exchange, options.severity);

        channel.publish(
            exchange.exchange,
            options.severity,
            Buffer.from(message),
            {
                contentType: 'application/json',
            }
        );
    } catch (error) {
        throw error;
    }
};

const subscribe = async (data, queueName) => {
    try {
        const connection = await amqp.connect(process.env.RABBIT_URL);

        const channel = await connection.createChannel();

        const queue = await channel.assertQueue(queueName, {
            durable: true,
        });

        await channel.consume(
            queue.queue,
            async (msg) => {
                const options = JSON.parse(msg.content.toString());

                try {
                    await data.sendMail(options);

                    channel.ack(msg);
                } catch (error) {
                    channel.nack(msg);

                    throw error;
                }
            },
            {
                noAck: false,
            }
        );
    } catch (error) {
        throw error;
    }
};
/* eslint-enable */

const messageQueueService = {
    publish,
    subscribe,
};

module.exports = messageQueueService;
