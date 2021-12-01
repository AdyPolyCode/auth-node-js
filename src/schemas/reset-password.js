const joi = require('joi');

const passwordReset = joi.object({
    password1: joi
        .string()
        .alphanum()
        .min(8)
        .max(16)
        .required(),
    password2: joi
        .valid(joi.ref('password1'))
        .required(),
});

module.exports = passwordReset;
