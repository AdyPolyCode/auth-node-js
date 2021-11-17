const { asyncHandler } = require('../middlewares');
const { UnAuthorized, CustomError } = require('../errors');
const authService = require('../services/auth.service');

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const validLogin = await authService.login(email, password);

    const { user, token } = validLogin;

    res.status(200).json({
        message: `Successfully logged in as ${user.username}`,
        data: {
            user: {
                userId: user.id,
                username: user.username,
            },
            token: token.tokenString,
        },
    });
});

const register = asyncHandler(async (req, res, next) => {
    const { user, token } = await authService.register(req.body);

    res.status(201).json({
        message: `${user.username} successfully created`,
        data: {
            token: token.tokenString,
        },
    });
});

const logout = asyncHandler(async (req, res, next) => {
    await authService.logout(req.accessToken);

    res.status(200).json({
        message: 'Successfully logged out',
        data: {
            token: '',
        },
    });
});

module.exports = {
    login,
    register,
    logout,
};
