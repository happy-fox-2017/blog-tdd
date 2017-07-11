var express = require('express');
var router = express.Router();
const conn = require('../controllers/usersCont');

/* GET users listing. */
router.post('/signup', conn.createUser);
router.post('/login', conn.login);

module.exports = router;
