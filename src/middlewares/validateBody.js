const { ValidationError } = require('../errors');

const validateBody = (req, res, next) => {
    if (!Object.keys(req.body).length) {
        return next(new ValidationError('Enter at least one value'));
    }
    next();
};

module.exports = validateBody;
