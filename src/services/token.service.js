const { PrismaClient } = require('@prisma/client');

const { UnAuthorized } = require('../errors');
const { createUniqueToken } = require('./encryption.service');

const Token = new PrismaClient().token;

const createOne = async (userId) => {
    const tokenString = createUniqueToken(userId);

    const token = await Token.create({
        data: {
            userId,
            tokenString,
        },
    });

    return token;
};

const deactivateOne = async (tokenString) => {
    await Token.update({
        where: {
            tokenString,
        },
        data: {
            isActive: false,
        },
    });
};

const deactivateMany = async (userId) => {
    await Token.updateMany({
        where: {
            userId,
        },
        data: {
            isActive: false,
        },
    });
};

const getByTokenString = async (tokenString) => {
    const token = await Token.findFirst({
        where: {
            isActive: true,
            tokenString,
        },
    });

    if (!token) {
        throw new UnAuthorized('Invalid token');
    }

    return token;
};

const tokenService = {
    createOne,
    deactivateOne,
    deactivateMany,
    getByTokenString,
};

module.exports = tokenService;
