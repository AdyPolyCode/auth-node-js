const joi = require('joi');

const passwordForgot = joi.object({
    email: joi
        .string()
        .email()
        .max(100)
        .required(),
});

module.exports = passwordForgot;
