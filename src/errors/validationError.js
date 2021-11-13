const { StatusCodes } = require('http-status-codes');
const CustomError = require('./customError');

class ValidationError extends CustomError {
    constructor(message) {
        super(message);
        this.code = StatusCodes.NOT_ACCEPTABLE;
    }
}

module.exports = ValidationError;
