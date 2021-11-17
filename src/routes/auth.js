const router = require('express').Router();
const { login, register, logout } = require('../controllers/auth');
const { auth, validateBody } = require('../middlewares');
const { registerUser, loginUser } = require('../schemas');

router.post('/login', validateBody(loginUser), login);
router.post('/register', validateBody(registerUser), register);
router.get('/logout', auth, logout);

module.exports = router;
