const { CustomError } = require('../errors');
const logger = require('../utils/logger');

const { Prisma } = require('@prisma/client');

const errors = {
    P2002: {
        code: 409,
        message: '',
    },
    P2025: {
        code: 404,
        message: 'Product was not found',
    },
};

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if (process.env.NODE_ENV === 'dev') {
        logger.error(err.stack);
    }

    if (err instanceof CustomError) {
        error.code = err.code;
        error.message = err.message;
    }

    // Prisma query errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        error = errors[err.code];

        if (!error.message) {
            error.message = `Target with '${err.meta.target}' already exists`;
        }
    }

    // Invalid Id || Missing value from body
    if (err instanceof Prisma.PrismaClientValidationError) {
        let msg = err.message.split('Argument')[1];
        msg = msg.split('\n')[0];
        error.message = msg;
    }

    res.status(error.code || 500).json({
        error: error.message || 'Server Error',
    });
};

module.exports = errorHandler;
