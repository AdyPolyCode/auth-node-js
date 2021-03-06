const encryptionService = require('./encryption.service');
const userService = require('./user.service');
const tokenService = require('./token.service');
const mailService = require('./mail.service');

const changePassword = async (tokenString, password) => {
    const user = await userService.getByTokenString(tokenString);

    const hashedPassword = encryptionService.createHash(user.salt, password);

    await userService.updateOne(user.id, {
        hashedPassword,
    });

    await tokenService.deactivateMany(user.id);

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

    const url = await mailService.sendEmail(
        user.email,
        'password-reset',
        mailToken.tokenString
    );

    return url;
};

const register = async (username, email, password) => {
    const salt = encryptionService.createSalt();

    const hash = encryptionService.createHash(salt, password);

    const user = await userService.createOne(username, email, hash, salt);

    const authToken = await tokenService.createOne(user.id);

    const mailToken = await tokenService.createOne(user.id);

    const url = await mailService.sendEmail(
        email,
        'mail-confirmation',
        mailToken.tokenString
    );

    return {
        user,
        authToken,
        url,
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

const me = async (userId) => {
    const user = await userService.getOne(userId);

    return user;
};

const authService = {
    register,
    login,
    logout,
    me,
    forgotPassword,
    changePassword,
    confirmMail,
};

module.exports = authService;
