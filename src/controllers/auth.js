const { asyncHandler } = require('../middlewares');
const authService = require('../services/auth.service');

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const { user, token } = await authService.login(email, password);

    res.status(200).json({
        message: `Successfully logged in as ${user.username}`,
        data: {
            user: {
                userId: user.id,
                username: user.username,
                role: user.role,
            },
            token: token.tokenString,
        },
    });
});

const register = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    const { user, authToken, url } = await authService.register(
        username,
        email,
        password
    );

    res.status(201).json({
        message: `${user.username} successfully created & confirmation email sent`,
        data: {
            token: authToken.tokenString,
            url,
        },
    });
});

const me = asyncHandler(async (req, res, next) => {
    const user = await authService.me(req.userId);

    res.status(200).json({
        message: 'Success',
        user,
    });
});

const logout = asyncHandler(async (req, res, next) => {
    await authService.logout(req.accessToken);

    res.status(200).json({
        message: 'Successfully logged out',
    });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    const url = await authService.forgotPassword(email);

    res.status(200).json({
        message: 'Reset password email successfully sent',
        url,
    });
});

const resetPassword = asyncHandler(async (req, res, next) => {
    const { resetToken } = req.params;

    const { password1, password2 } = req.body;

    await authService.changePassword(resetToken, password1, password2);

    res.status(200).json({ message: 'Password successfully changed' });
});

const confirmMail = asyncHandler(async (req, res, next) => {
    const { mailToken } = req.params;

    await authService.confirmMail(mailToken);

    res.status(200).json({ message: 'Email successfully confirmed' });
});

module.exports = {
    login,
    register,
    logout,
    me,
    forgotPassword,
    resetPassword,
    confirmMail,
};
