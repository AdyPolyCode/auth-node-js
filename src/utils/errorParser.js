// prisma errors
const errors = {
    // unique constraint
    P2002: {
        statusCode: 409,
        message: 'Record already exists - ',
    },
    // null constraint
    P2011: {
        statusCode: 400,
        message: 'Null constraint violation on - ',
    },
    // operation failed - of record not found
    P2025: {
        statusCode: 404,
        message: '',
    },
};

module.exports = function errorParser(error) {
    if (error.statusCode && error.message) {
        const { statusCode, message } = error;

        return { statusCode, message };
    }

    const {
        code,
        meta: { constraint, target, cause },
    } = error;

    const err = { ...errors[code] };
    err.message += constraint || target || cause;

    return err;
};
