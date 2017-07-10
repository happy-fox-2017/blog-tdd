'use strict'
const express = require('express');
const router = express.Router();
var controller = require('../controllers/articleController')

/* Get main endpoint*/

router.post('/',controller.createArticle);
router.get('/',controller.getAllArticle);
router.delete('/:id',controller.deleteArticle);



module.exports = router;