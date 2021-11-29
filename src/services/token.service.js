const { PrismaClient } = require('@prisma/client');

const { UnAuthorized } = require('../errors');
const { createUniqueToken } = require('./encryption.service');

const Token = new PrismaClient().token;

const createToken = async (userId) => {
    const tokenString = createUniqueToken(userId);

    const token = await Token.create({
        data: {
            userId,
            tokenString,
        },
    });

    return token;
};

const deactivateToken = async (tokenString) => {
    await Token.update({
        where: {
            tokenString,
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
    createToken,
    deactivateToken,
    getByTokenString,
};

module.exports = tokenService;
