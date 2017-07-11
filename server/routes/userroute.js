const User = require('../controllers/user');
const router = require('express').Router();

router.get('/', User.getAllUsers);
router.post('/signup', User.signupUser);
router.post('/signin', User.signinUser);

module.exports = router;