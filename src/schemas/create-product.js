const joi = require('joi');

const productCreate = joi.object({
    name: joi
        .string()
        .alphanum()
        .min(4)
        .max(20)
        .required(),
    description: joi
        .string()
        .max(200)
        .optional()
        .default(''),
    price: joi.number().required(),
});

module.exports = productCreate;
