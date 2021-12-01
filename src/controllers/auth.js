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

    const options = {
        host: req.get('host'),
        path: '/api/auth/mail-confirmation',
    };

    const { user, token } = await authService.register(
        username,
        email,
        password,
        options
    );

    res.status(201).json({
        message: `${user.username} successfully created & confirmation email sent`,
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

const forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    const options = {
        host: req.get('host'),
        path: '/api/auth/password-reset',
    };

    await authService.sendPasswordResetMail(email, options);

    res.status(200).json({ message: 'Reset password email successfully sent' });
});

const resetPassword = asyncHandler(async (req, res, next) => {
    const { resetToken } = req.params;
    const { password1, password2 } = req.body;

    const user = await authService.changePassword(
        resetToken,
        password1,
        password2
    );

    res.status(200).json({ message: 'Password successfully changed', user });
});

const confirmMail = asyncHandler(async (req, res, next) => {
    const { mailToken } = req.params;

    await authService.confirmMail(mailToken);

    res.status(200).json({ message: 'Email successfully confirmed' });
});

function renderConfirmMail(req, res) {
    const url = `http://${req.get('host')}/api/auth${req.path}`;

    res.render('mail-confirmation', {
        title: 'Mail-Confirmation',
        url,
    });
}

function renderResetPassword(req, res) {
    const url = `http://${req.get('host')}/api/auth${req.path}`;

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
