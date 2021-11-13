const { PrismaClient } = require('@prisma/client');

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
    const date = new Date().toISOString();

    const token = await Token.update({
        where: {
            tokenString,
        },
        data: {
            active: false,
            updatedAt: date,
        },
    });

    return true;
};

const getByTokenString = async (tokenString) => {
    const token = await Token.findUnique({
        where: {
            tokenString,
        },
    });

    if (!token) {
        return false;
    }

    return token;
};

const tokenService = {
    createToken,
    deactivateToken,
    getByTokenString,
};

module.exports = tokenService;
