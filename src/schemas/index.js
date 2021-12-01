const userRegister = require('./register-user');
const userLogin = require('./login-user');
const productCreate = require('./create-product');
const productUpdate = require('./update-product');
const passwordReset = require('./reset-password');
const passwordForgot = require('./forgot-password');

module.exports = {
    userRegister,
    userLogin,
    productCreate,
    productUpdate,
    passwordReset,
    passwordForgot,
};
