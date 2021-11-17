const { randomBytes, createHmac } = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { UnAuthorized } = require('../errors');

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

    if (hash !== hashedPassword) {
        throw new UnAuthorized('Invalid credentials');
    }
};

const createUniqueToken = () => {
    const uuidTimestamp = uuidv4() + Math.floor(Date.now() / 1000);

    return uuidTimestamp;
};

const encryptionService = {
    createHash,
    createSalt,
    comparePassword,
    createUniqueToken,
};

module.exports = encryptionService;
