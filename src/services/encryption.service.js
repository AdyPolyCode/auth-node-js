const { randomBytes, createHmac } = require('crypto');
const { v4: uuidv4 } = require('uuid');

const createHash = (salt, password) => {
    const hash = createHmac('sha256', password).update(salt).digest('hex');

    return hash;
};

const createSalt = () => {
    const salt = randomBytes(16).toString('hex');

    return salt;
};

const comparePassword = (salt, password, hashedPassword) => {
    const hash = createHmac('sha256', password).update(salt).digest('hex');

    return hash === hashedPassword;
};

const createUniqueToken = () => {
    const tokenString = uuidv4() + Date.now();

    return tokenString;
};

const encryptionService = {
    createHash,
    createSalt,
    comparePassword,
    createUniqueToken,
};

module.exports = encryptionService;
