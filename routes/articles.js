var express = require('express');
var articleCtrl = require('../controllers/articleController')
var router = express.Router();


router.get('/', articleCtrl.getAll)

router.post('/', articleCtrl.create);


module.exports = router;
