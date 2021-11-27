const joi = require('joi');

const loginUser = joi.object({
    email: joi.string().email().required(),
    password: joi.string().alphanum().required(),
});

module.exports = loginUser;
