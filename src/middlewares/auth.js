const userService = require('../services/user.service');
const { BadRequest, Forbidden } = require('../errors');

const authenticate =
    (...userRole) =>
    async (req, res, next) => {
        try {
            const tokenString = req.headers['x-authorization'];
            const { role, id } = await userService.getByTokenString(
                tokenString
            );

            if (!userRole.includes(role)) {
                next(new Forbidden('Not allowed to do this method'));
            }

            req.userId = id;

            next();
        } catch (error) {
            next(error);
        }
    };

const checkVerification = async (req, res, next) => {
    const { email } = req.body;

    const { isVerified } = await userService.getByEmail(email);

    if (!isVerified) {
        next(new BadRequest('Please confirm your email'));
    }

    next();
};

module.exports = { authenticate, checkVerification };
