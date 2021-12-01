const userService = require('../services/user.service');
const { BadRequest } = require('../errors');

const authenticate = async (req, res, next) => {
    try {
        const tokenString = req.headers['x-authorization'];
        const user = await userService.getByTokenString(tokenString);

        if (!user.isVerified) {
            next(new BadRequest('Please confirm your email'));
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authenticate;
