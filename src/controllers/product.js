const { asyncHandler } = require('../middlewares');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ rejectOnNotFound: true });

const getAll = asyncHandler(async (req, res, next) => {
    /*
        get page query string from url
        parse string to integer && create skip number for pagination
        check if skip value is a pozitive value
    */
    let { page } = req.query;

    page = parseInt(page, 10);
    toSkip = (page - 1 || 0) * 3;

    if (toSkip < 0) toSkip = 0;

    /*
        return list of products based on pagination
    */
    const products = await prisma.product.findMany({
        skip: toSkip,
        take: 3,
    });

    res.status(200).json({
        message: 'Successfully fetched',
        data: products,
        count: products.length,
    });
});

const getOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
        where: {
            id: Number(id),
        },
    });

    res.status(200).json({
        message: 'Successfully fetched',
        data: product,
    });
});

const createOne = asyncHandler(async (req, res, next) => {
    const product = await prisma.product.create({
        data: req.body,
    });

    res.status(201).json({
        message: 'Successfully created',
        data: product,
    });
});

const updateOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const product = await prisma.product.update({
        where: {
            id: Number(id),
        },
        data: req.body,
    });

    res.status(200).json({
        message: 'Successfully updated',
        data: product,
    });
});

const deleteOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const product = await prisma.product.delete({
        where: {
            id: Number(id),
        },
    });

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
