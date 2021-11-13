const { StatusCodes } = require('http-status-codes');
const CustomError = require('./customError');

class NotFound extends CustomError {
    constructor(message) {
        super(message);
        this.code = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFound;
