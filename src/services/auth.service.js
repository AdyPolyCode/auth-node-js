const encryptionService = require('./encryption.service');
const userService = require('./user.service');
const tokenService = require('./token.service');

const register = async (username, email, password) => {
    const salt = encryptionService.createSalt();

    const hash = encryptionService.createHash(salt, password);

    const user = await userService.createOne(username, email, hash, salt);

    const tokenString = encryptionService.createUniqueToken(user.id);

    const token = await tokenService.createToken(user.id, tokenString);

    return { user, token };
};

const login = async (email, password) => {
    const user = await userService.getByEmail(email);

    encryptionService.comparePassword(user.salt, password, user.hashedPassword);

    const tokenString = encryptionService.createUniqueToken();

    const token = await tokenService.createToken(user.id, tokenString);

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
};

module.exports = authService;
