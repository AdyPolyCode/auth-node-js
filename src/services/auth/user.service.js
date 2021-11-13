const { PrismaClient } = require('@prisma/client');

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

    return user;
};

const deleteOne = async (userId) => {
    const user = await User.delete({
        where: {
            id: userId,
        },
    });

    return user;
};

const getByTokenString = async (tokenString) => {
    const user = await User.findFirst({
        where: {
            token: {
                tokenString,
            },
        },
    });

    return user;
};

const getByEmail = async (email) => {
    const user = await User.findUnique({
        where: {
            email,
        },
    });

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
