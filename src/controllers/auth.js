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
            },
            token: token.tokenString,
        },
    });
});

const register = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    const { user, authToken } = await authService.register(
        username,
        email,
        password
    );

    res.status(201).json({
        message: `${user.username} successfully created & confirmation email sent`,
        data: {
            token: authToken.tokenString,
        },
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

    await authService.sendPasswordResetMail(email);

    res.status(200).json({ message: 'Reset password email successfully sent' });
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

function renderConfirmMail(req, res) {
    const { mailToken } = req.params;

    const host = `${process.env.NODE_HOST}:${process.env.NODE_PORT}`;
    const url = `http://${host}/api/auth/mail-confirmation/${mailToken}`;

    res.render('mail-confirmation', {
        title: 'Mail-Confirmation',
        url,
    });
}

function renderResetPassword(req, res) {
    const { mailToken } = req.params;

    const host = `${process.env.NODE_HOST}:${process.env.NODE_PORT}`;
    const url = `http://${host}/api/auth/password-reset//${mailToken}`;

    res.render('password-reset', {
        title: 'Password-Reset',
        url,
    });
}

module.exports = {
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    renderResetPassword,
    confirmMail,
    renderConfirmMail,
};
