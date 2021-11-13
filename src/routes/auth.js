const router = require('express').Router();
const { login, register, logout } = require('../controllers/auth');
const { auth } = require('../middlewares');

router.post('/login', login);
router.post('/register', register);
router.get('/logout', auth, logout);

module.exports = router;
