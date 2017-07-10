var express = require('express');
var articleCtrl = require('../controllers/articleController')
var router = express.Router();


router.get('/', articleCtrl.getAll)

router.get('/:id', articleCtrl.getOne)

router.post('/', articleCtrl.create);

router.delete('/:id', articleCtrl.remove)


module.exports = router;
