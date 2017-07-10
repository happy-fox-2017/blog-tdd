'use strict'
const express = require('express');
const router = express.Router();
var controller = require('../controllers/articleController')

/* Get main endpoint*/

router.post('/',controller.createArticle);
router.get('/',controller.getAllArticle);



module.exports = router;