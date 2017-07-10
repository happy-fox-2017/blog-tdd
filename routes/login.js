const express = require('express');
const router = express.Router();
const cLogin = require('../controller/cLogin');

/* GET home page. */
router.post('/', cLogin);

module.exports = router;