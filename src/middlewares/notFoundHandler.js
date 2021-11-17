const { NotFound } = require('../errors');

const notFoundHandler = (req, res) => {
    const error = new NotFound('No specific page was found');
    res.status(error.statusCode).json({
        error: error.message,
    });
};

module.exports = notFoundHandler;
