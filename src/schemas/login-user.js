const joi = require('joi');

const userLogin = joi.object({
    email: joi.string().email().required(),
    password: joi.string().alphanum().required(),
});

module.exports = userLogin;
