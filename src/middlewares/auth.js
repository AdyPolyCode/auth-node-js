const { UnAuthorized } = require('../errors');

const authenticate = (req, res, next) => {
    const headerToken = req.headers.authorization;

    if (!headerToken || !headerToken.startsWith('Bearer ')) {
        return next(new UnAuthorized('Please log in first'));
    }

    const token = headerToken.split(' ')[1];

    req.accessToken = token;

    next();
};

module.exports = authenticate;
