var express = require('express');
var router = express.Router();
var cArtikel = require('../controller/cArtikel');

/* GET home page. */
router.post('/', cArtikel.artikelPost);
router.delete('/:id', cArtikel.artikelDelete);

module.exports = router;