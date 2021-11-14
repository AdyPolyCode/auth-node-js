const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAll = async (options) => {};

const getOne = async (productId) => {};

const createOne = async () => {};

const updateOne = async (productId) => {};

const deleteOne = async (productId) => {};

const productService = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
};

module.exports = productService;
