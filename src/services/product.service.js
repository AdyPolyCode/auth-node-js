const { PrismaClient } = require('@prisma/client');

const { NotFound } = require('../errors');

const Product = new PrismaClient().product;

const getAll = async (options) => {
    let { page } = options;

    page &&= parseInt(page, 10);

    page ||= 1;

    const skip = (page - 1) * 3;
    const take = 4;

    const products = await Product.findMany({
        skip,
        take,
        orderBy: {
            createdAt: 'desc',
        },
    });

    return products;
};

const getOne = async (productId) => {
    const product = await Product.findFirst({
        where: {
            id: productId,
        },
    });

    if (!product) {
        throw new NotFound(`Product with ${productId} was not found`);
    }

    return product;
};

const createOne = async ({ name, description, price }) => {
    const product = await Product.create({
        data: {
            name,
            description: description || '',
            price,
        },
    });

    return product;
};

const updateOne = async (productId, data) => {
    const product = await Product.update({
        where: {
            id: productId,
        },
        data,
    });

    if (!product) {
        throw new NotFound(`Product with ${productId} was not found`);
    }

    return product;
};

const deleteOne = async (productId) => {
    const product = await Product.delete({
        where: {
            id: productId,
        },
    });

    if (!product) {
        throw new NotFound(`Product with ${productId} was not found`);
    }

    return product;
};

const productService = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
};

module.exports = productService;
