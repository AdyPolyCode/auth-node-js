const encryptionService = require('./encryption.service');
const userService = require('./user.service');
const tokenService = require('./token.service');
const mailService = require('./mail.service');

const sendPasswordResetMail = async (email) => {
    const user = await userService.getByEmail(email);

    const { tokenString } = await tokenService.createToken(user.id);

    await mailService.sendEmail(email, 'password-reset', tokenString);
};

const changePassword = async (tokenString, password) => {
    const user = await userService.getByTokenString(tokenString);

    const hashedPassword = encryptionService.createHash(user.salt, password);

    await userService.updateOne(user.id, {
        hashedPassword,
    });

    await tokenService.deactivateToken(tokenString);

    return user;
};

const confirmMail = async (mailToken) => {
    const user = await userService.getByTokenString(mailToken);

    await userService.updateOne(user.id, { isVerified: true });

    await tokenService.deactivateToken(mailToken);
};

const register = async (username, email, password) => {
    const salt = encryptionService.createSalt();

    const hash = encryptionService.createHash(salt, password);

    const user = await userService.createOne(username, email, hash, salt);

    const authToken = await tokenService.createToken(user.id);

    const mailToken = await tokenService.createToken(user.id);

    await mailService.sendEmail(
        email,
        'mail-confirmation',
        mailToken.tokenString
    );

    return { user, authToken };
};

const login = async (email, password) => {
    const user = await userService.getByEmail(email);

    encryptionService.comparePassword(user.salt, password, user.hashedPassword);

    const token = await tokenService.createToken(user.id);

    return { user, token };
};

const logout = async (tokenString) => {
    const token = await tokenService.getByTokenString(tokenString);

    await tokenService.deactivateToken(token.tokenString);
};

const authService = {
    register,
    login,
    logout,
    sendPasswordResetMail,
    changePassword,
    confirmMail,
};

module.exports = authService;
