const router = require('express').Router();
const {
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    renderResetPassword,
    confirmMail,
    renderConfirmMail,
} = require('../controllers/auth');
const { auth, validateBody } = require('../middlewares');
const {
    userRegister,
    userLogin,
    passwordReset,
    passwordForgot,
} = require('../schemas');

// reset & confirm endpoints
router
    .route('/mail-confirmation/:mailToken')
    .get(renderConfirmMail)
    .post(confirmMail);
router
    .route('/password-reset/:resetToken')
    .get(renderResetPassword)
    .post(validateBody(passwordReset), resetPassword);

// forgot endpoint
router.post('/forgot-password', validateBody(passwordForgot), forgotPassword);

// other user endpoints
router.post('/login', validateBody(userLogin), login);
router.post('/register', validateBody(userRegister), register);
router.get('/logout', auth, logout);

module.exports = router;
