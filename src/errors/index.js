const BadRequest = require('./bad-request');
const CustomError = require('./custom-error');
const NotFound = require('./not-found');
const UnAuthorized = require('./unauthorized');
const ValidationError = require('./validation-error');
const Forbidden = require('./forbidden');

module.exports = {
    CustomError,
    BadRequest,
    NotFound,
    UnAuthorized,
    ValidationError,
    Forbidden,
};
