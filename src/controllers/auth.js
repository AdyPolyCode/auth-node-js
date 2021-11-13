const { asyncHandler } = require('../middlewares');
const { UnAuthorized } = require('../errors');
const authService = require('../services/auth/auth.service');

// TODO: finish error handling
const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next();
    }

    const validLogin = await authService.login(email, password);

    if (!validLogin) {
        return next(new UnAuthorized('Invalid credentials'));
    }

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
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next();
    }

    const { user, token } = await authService.register(
        username,
        email,
        password
    );

    res.status(201).json({
        message: `${user.username} successfully created`,
        data: {
            token: token.tokenString,
        },
    });
});

const logout = asyncHandler(async (req, res, next) => {
    const validLogout = await authService.logout(req.accessToken);

    if (!validLogout) {
        return next();
    }

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
