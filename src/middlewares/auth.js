const userService = require('../services/user.service');

const authenticate = async (req, res, next) => {
    const tokenString = req.headers['x-authorization'];
    try {
        const user = await userService.getByTokenString(tokenString);

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authenticate;
