const { pbkdf2Sync } = require('pbkdf2');
const randomString = require('randomstring');
const { v4: uuidv4 } = require('uuid');

const createHash = (salt, password) => {
    const hash = pbkdf2Sync(password, salt, 1, 16, 'sha256').toString('hex');

    return hash;
};

const createSalt = () => {
    const salt = randomString.generate();

    return salt;
};

const comparePassword = (salt, password, hashedPassword) => {
    const hash = pbkdf2Sync(password, salt, 1, 16, 'sha256').toString('hex');

    return hash === hashedPassword;
};

const createUniqueToken = () => {
    const tokenString = uuidv4();

    return tokenString;
};

const encryptionService = {
    createHash,
    createSalt,
    comparePassword,
    createUniqueToken,
};

module.exports = encryptionService;
