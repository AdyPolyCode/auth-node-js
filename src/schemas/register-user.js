const joi = require('joi');

const userRegister = joi.object({
    username: joi
        .string()
        .alphanum()
        .min(4)
        .max(12)
        .required(),
    email: joi
        .string()
        .email()
        .max(100)
        .required(),
    password: joi
        .string()
        .alphanum()
        .min(8)
        .max(16)
        .required(),
});

module.exports = userRegister;
