const CustomError = require('./customError');
const { StatusCodes } = require('http-status-codes');

class ValidationError extends CustomError {
    constructor(message) {
        super(message);
        this.code = StatusCodes.NOT_ACCEPTABLE;
    }
}

module.exports = ValidationError;
