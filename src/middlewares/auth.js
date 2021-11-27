const userService = require('../services/user.service');

const authenticate = async (req, res, next) => {
    try {
        const tokenString = req.headers['x-authorization'];
        const user = await userService.getByTokenString(tokenString);

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authenticate;
