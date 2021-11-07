const CustomError = require('./customError');
const { StatusCodes } = require('http-status-codes');

class UnAuthorizedError extends CustomError {
    constructor(message) {
        super(message);
        this.code = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnAuthorizedError;
