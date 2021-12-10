const encryptionService = require('./encryption.service');
const userService = require('./user.service');
const tokenService = require('./token.service');
const messageQueueService = require('./message-queue.service');

const changePassword = async (tokenString, password) => {
    const user = await userService.getByTokenString(tokenString);

    const hashedPassword = encryptionService.createHash(user.salt, password);

    await userService.updateOne(user.id, {
        hashedPassword,
    });

    await tokenService.deactivateMany(tokenString);

    return user;
};

const confirmMail = async (mailToken) => {
    const user = await userService.getByTokenString(mailToken);

    await userService.updateOne(user.id, { isVerified: true });

    await tokenService.deactivateOne(mailToken);
};

const forgotPassword = async (email) => {
    const user = await userService.getByEmail(email);

    const mailToken = await tokenService.createOne(user.id);

    messageQueueService.send({
        email,
        type: 'password-reset',
        tokenString: mailToken.tokenString,
    });

    messageQueueService.receive();

    return `http://${process.env.NODE_HOST}:${process.env.NODE_PORT}/api/auth/password-reset/${mailToken.tokenString}`;
};

const register = async (username, email, password) => {
    const salt = encryptionService.createSalt();

    const hash = encryptionService.createHash(salt, password);

    const user = await userService.createOne(username, email, hash, salt);

    const authToken = await tokenService.createOne(user.id);

    const mailToken = await tokenService.createOne(user.id);

    messageQueueService.send({
        email,
        type: 'mail-confirmation',
        tokenString: mailToken.tokenString,
    });

    messageQueueService.receive();

    return {
        user,
        authToken,
        url: `http://${process.env.NODE_HOST}:${process.env.NODE_PORT}/api/auth/mail-confirmation/${mailToken.tokenString}`,
    };
};

const login = async (email, password) => {
    const user = await userService.getByEmail(email);

    encryptionService.comparePassword(user.salt, password, user.hashedPassword);

    const token = await tokenService.createOne(user.id);

    return { user, token };
};

const logout = async (tokenString) => {
    const token = await tokenService.getByTokenString(tokenString);

    await tokenService.deactivateOne(token.tokenString);
};

const authService = {
    register,
    login,
    logout,
    forgotPassword,
    changePassword,
    confirmMail,
};

module.exports = authService;
