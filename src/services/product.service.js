const { PrismaClient } = require('@prisma/client');

const queryParser = require('../utils/query-parser');
const { NotFound } = require('../errors');

const Product = new PrismaClient().product;
const User = new PrismaClient().user;

const getAll = async (options) => {
    const queries = queryParser(options);

    const products = await Product.findMany({
        skip: queries.skip,
        take: queries.take,
        orderBy: queries.orderBy,
        where: queries.where,
    });

    return { products, page: queries.page };
};

const getOne = async (productId) => {
    const product = await Product.findFirst({
        where: {
            id: Number(productId) || -1,
        },
    });

    if (!product) {
        throw new NotFound(`Product with ${productId} was not found`);
    }

    return product;
};

const createOne = async (userId, { name, description, price }) => {
    const product = await Product.create({
        data: {
            user: {
                connect: {
                    id: userId,
                },
            },
            name,
            description: description || '',
            price,
        },
    });

    return product;
};

const updateOne = async (userId, productId, data) => {
    const product = await Product.update({
        data: {
            user: {
                connect: {
                    id: userId,
                },
            },
            ...data,
        },
        where: {
            id: Number(productId),
        },
    });

    if (!product) {
        throw new NotFound(`Product with ${productId} was not found`);
    }

    return product;
};

const deleteOne = async (productId) => {
    const product = await Product.delete({
        where: {
            id: Number(productId),
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
