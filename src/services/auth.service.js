const encryptionService = require('./encryption.service');
const userService = require('./user.service');
const tokenService = require('./token.service');
const mailService = require('./mail.service');

const sendConfirmationMail = async (email, id, options) => {
    const { tokenString } = await tokenService.createToken(id);

    const generatedUrl = mailService.generateUrl(
        options,
        'mail-confirmation',
        tokenString
    );

    await mailService.sendEmail(email, 'mail-confirmation', generatedUrl);
};

const sendPasswordResetMail = async (email, options) => {
    const user = await userService.getByEmail(email);

    const { tokenString } = await tokenService.createToken(user.id);

    const generatedUrl = mailService.generateUrl(
        options,
        'mail-confirmation',
        tokenString
    );

    await mailService.sendEmail(email, 'password-reset', generatedUrl);
};

const changePassword = async (tokenString, password1, password2) => {
    const user = await userService.getByTokenString(tokenString);

    const hashedPassword = encryptionService.createHash(user.salt, password1);

    await userService.updateOne(user.id, {
        hashedPassword,
    });

    await tokenService.deactivateToken(tokenString);

    return user;
};

const confirmMail = async (tokenString) => {
    const user = await userService.getByTokenString(tokenString);

    await userService.updateOne(user.id, { isVerified: true });

    await tokenService.deactivateToken(tokenString);
};

const register = async (username, email, password, options) => {
    const salt = encryptionService.createSalt();

    const hash = encryptionService.createHash(salt, password);

    const user = await userService.createOne(username, email, hash, salt);

    const token = await tokenService.createToken(user.id);

    await sendConfirmationMail(user.email, user.id, options);

    return { user, token };
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
    sendConfirmationMail,
    sendPasswordResetMail,
    changePassword,
    confirmMail,
};

module.exports = authService;
