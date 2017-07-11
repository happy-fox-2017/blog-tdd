'use strict'

const express = require('express');
const router = express.Router();
var controller = require('../controllers/authorController');

/* GET main endpoint*/

router.post('/',controller.userSignUp);
router.post('/signin/',controller.userSignIn);
router.get('/',controller.getAllUser);
router.delete('/:id',controller.deleteUser);

module.exports = router;