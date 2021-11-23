const userService = require('../services/user.service');
const tokenService = require('../services/token.service');
const { UnAuthorized } = require('../errors');

const authenticate = async (req, res, next) => {
    const headerToken = req.headers.authorization;
    if (!headerToken || !headerToken.startsWith('Bearer ')) {
        return next(new UnAuthorized('Invalid token'));
    }

    const tokenString = req.headers.authorization.split(' ');

    const token = await tokenService.getByTokenString(tokenString[1]);
    if (!token.active) {
        return next(new UnAuthorized('Invalid token, token is inactive'));
    }

    await userService.getByTokenString(tokenString[1]);

    next();
};

module.exports = authenticate;
