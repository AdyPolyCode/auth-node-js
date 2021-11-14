const { PrismaClient } = require('@prisma/client');

const { UnAuthorized } = require('../errors');

const Token = new PrismaClient().token;

const createToken = async (userId, tokenString) => {
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
            active: false,
        },
    });
};

const getByTokenString = async (tokenString) => {
    const token = await Token.findFirst({
        where: {
            active: true,
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
