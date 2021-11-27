const { ValidationError } = require('../errors');

const validateBody = (schema) => async (req, res, next) => {
    try {
        const valid = await schema.validateAsync(req.body);

        next();
    } catch (error) {
        next(new ValidationError(error.details[0].message));
    }
};

module.exports = validateBody;
