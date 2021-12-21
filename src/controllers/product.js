const { asyncHandler } = require('../middlewares');

const productService = require('../services/product.service');

const getAll = asyncHandler(async (req, res, next) => {
    const { products, page } = await productService.getAll(req.query);

    res.status(200).json({
        message: 'Successfully fetched',
        data: products,
        page,
        count: products.length,
    });
});

const getOne = asyncHandler(async (req, res, next) => {
    const product = await productService.getOne(req.params.id);

    res.status(200).json({
        message: 'Successfully fetched',
        data: product,
    });
});

const createOne = asyncHandler(async (req, res, next) => {
    const product = await productService.createOne(req.userId, req.body);

    res.status(201).json({
        message: 'Successfully created',
        data: product,
    });
});

const updateOne = asyncHandler(async (req, res, next) => {
    const product = await productService.updateOne(
        req.userId,
        req.params.id,
        req.body
    );

    res.status(200).json({
        message: 'Successfully updated',
        data: product,
    });
});

const deleteOne = asyncHandler(async (req, res, next) => {
    const product = await productService.deleteOne(req.params.id);

    res.status(200).json({
        message: 'Successfully deleted',
        data: product,
    });
});

module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
};
