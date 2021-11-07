const { createLogger, format, transports, addColors } = require('winston');

const prettier = format.combine(
    format.colorize({
        all: true,
    }),
    format.label({
        label: ' -| Logger |- ',
    }),
    format.timestamp({
        format: 'YY-MM-DD HH:MM:SS',
    }),
    format.printf(
        (text) =>
            `${text.label} - ${text.timestamp} - ${text.level} - ${text.message}`
    )
);

addColors({
    error: 'bold red',
    info: 'bold blue',
});

module.exports = createLogger({
    transports: [
        new transports.Console({
            level: 'error',
            format: format.combine(format.colorize(), prettier),
        }),

        new transports.Console({
            level: 'info',
            format: format.combine(format.colorize(), prettier),
        }),
    ],
});
