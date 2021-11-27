const logger = require('../utils/logger');
const errorParser = require('../utils/errorParser');

const errorHandler = (err, req, res, next) => {
    const { statusCode, message } = errorParser(err);

    if (process.env.NODE_ENV === 'dev') {
        logger.error(err.stack);
    }

    res.status(statusCode || 500).json({
        error: message || 'Server Error',
    });
};

module.exports = errorHandler;
