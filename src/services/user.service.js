const { PrismaClient } = require('@prisma/client');
const { NotFound, UnAuthorized } = require('../errors');

const User = new PrismaClient().user;

const getAll = async () => {
    const users = await User.findMany();

    return users;
};

const getOne = async (userId) => {
    const user = await User.findFirst({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new NotFound(`User with ${userId} was not found`);
    }

    return user;
};

const createOne = async (username, email, hashedPassword, salt) => {
    const user = await User.create({
        data: {
            username,
            email,
            hashedPassword,
            salt,
        },
    });

    return user;
};

const updateOne = async (userId, data) => {
    const user = await User.update({
        where: {
            id: userId,
        },
        data,
    });

    if (!user) {
        throw new NotFound(`User with ${userId} was not found`);
    }

    return user;
};

const deleteOne = async (userId) => {
    const user = await User.delete({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new NotFound(`User with ${userId} was not found`);
    }

    return user;
};

const getByTokenString = async (tokenString) => {
    const user = await User.findFirst({
        where: {
            token: {
                some: {
                    active: true,
                    tokenString,
                },
            },
        },
    });

    if (!user) {
        throw new UnAuthorized(`${tokenString} is invalid`);
    }

    return user;
};

const getByEmail = async (email) => {
    const user = await User.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new NotFound(`User with ${email} was not found`);
    }

    return user;
};

const userService = {
    getOne,
    getAll,
    createOne,
    updateOne,
    deleteOne,
    getByTokenString,
    getByEmail,
};

module.exports = userService;
