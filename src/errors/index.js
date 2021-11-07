const BadRequest = require('./badRequest');
const CustomError = require('./customError');
const NotFound = require('./notFound');
const UnAuthorized = require('./unAuthorized');
const ValidationError = require('./validationError');

module.exports = {
    CustomError,
    BadRequest,
    NotFound,
    UnAuthorized,
    ValidationError,
};
