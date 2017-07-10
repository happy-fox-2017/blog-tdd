const express = require('express'),
      router = express.Router(),
      conn = require('../controllers/artCont')

router.get('/', conn.findAllArticle)

router.post('/', conn.createArticle)

router.put('/:id', conn.updateArticle)

router.delete('/:id', conn.deleteArticle)


module.exports = router;