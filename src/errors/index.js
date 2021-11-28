const BadRequest = require('./bad-request');
const CustomError = require('./custom-error');
const NotFound = require('./not-found');
const UnAuthorized = require('./unauthorized');
const ValidationError = require('./validation-error');

module.exports = {
    CustomError,
    BadRequest,
    NotFound,
    UnAuthorized,
    ValidationError,
};
