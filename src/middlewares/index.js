const asyncHandler = require('./asyncHandler');
const auth = require('./auth');
const errorHandler = require('./errorHandler');
const notFoundHandler = require('./notFoundHandler');
const validateBody = require('./validateBody');

module.exports = {
    asyncHandler,
    auth,
    errorHandler,
    notFoundHandler,
    validateBody,
};
