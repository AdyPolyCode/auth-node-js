const amqp = require('amqplib');

/* eslint-disable */
const publish = async (data, options) => {
    try {
        const message = JSON.stringify(data);

        const connection = await amqp.connect(process.env.RABBIT_URL);

        const channel = await connection.createChannel();

        const exchange = await channel.assertExchange('exOne', 'direct', {
            durable: true,
        });

        await channel.publish(
            exchange.exchange,
            options.severity,
            Buffer.from(message),
            {
                persistent: true,
                contentType: 'application/json',
            }
        );
    } catch (error) {
        throw error;
    }
};

const subscribe = async (data, options) => {
    try {
        const connection = await amqp.connect(process.env.RABBIT_URL);

        const channel = await connection.createChannel();

        const exchange = await channel.assertExchange('exOne', 'direct', {
            durable: true,
        });

        const queue = await channel.assertQueue(options.queueName, {
            durable: true,
        });

        await channel.bindQueue(
            queue.queue,
            exchange.exchange,
            options.severity
        );

        await channel.consume(queue.queue, async (msg) => {
            const message = JSON.parse(msg.content.toString('utf8'));

            try {
                await data.sendMail(message);

                channel.ack(msg);
            } catch (error) {
                channel.nack(msg);
            }
        });
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
