const userService = require('../services/user.service');
const { BadRequest, UnAuthorized } = require('../errors');

const authenticate =
    (...userRole) =>
    async (req, res, next) => {
        try {
            const tokenString = req.headers['x-authorization'];
            const { isVerified, role, id } = await userService.getByTokenString(
                tokenString
            );

            if (!isVerified) {
                next(new BadRequest('Please confirm your email'));
            }

            if (!userRole.includes(role)) {
                next(new UnAuthorized('Not allowed to do this method'));
            }

            req.userId = id;

            next();
        } catch (error) {
            next(error);
        }
    };

module.exports = authenticate;
