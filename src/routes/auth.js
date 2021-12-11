const router = require('express').Router();
const {
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    confirmMail,
} = require('../controllers/auth');
const { auth, validateBody } = require('../middlewares');
const {
    userRegister,
    userLogin,
    passwordReset,
    passwordForgot,
} = require('../schemas');

// reset & confirm endpoints
router.post('/mail-confirmation/:mailToken', confirmMail);
router.post(
    '/password-reset/:resetToken',
    validateBody(passwordReset),
    resetPassword
);

// forgot endpoint
router.post('/forgot-password', validateBody(passwordForgot), forgotPassword);

// other user endpoints
router.post('/login', validateBody(userLogin), login);
router.post('/register', validateBody(userRegister), register);
router.get('/logout', auth('USER', 'ADMIN'), logout);

module.exports = router;
