const { StatusCodes } = require('http-status-codes');
const CustomError = require('./customError');

class ValidationError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_ACCEPTABLE;
    }
}

module.exports = ValidationError;
