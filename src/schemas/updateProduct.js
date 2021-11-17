const joi = require('joi');

const updateProduct = joi
    .object({
        name: joi
            .string()
            .alphanum()
            .min(4)
            .max(20)
            .optional(),
        description: joi
            .string()
            .max(200)
            .optional(),
        price: joi.number().optional(),
    })
    .min(1)
    .message('Enter at least one value');

module.exports = updateProduct;
