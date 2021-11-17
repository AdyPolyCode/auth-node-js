const joi = require('joi');

const createProduct = joi.object({
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

module.exports = createProduct;
