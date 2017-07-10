var express = require('express');
var router = express.Router();
var cArtikel = require('../controller/cArtikel');

/* GET home page. */
router.get('/', cArtikel.artikelGet);
router.post('/', cArtikel.artikelPost);
router.put('/:id',cArtikel.artikelPut);
router.delete('/:id', cArtikel.artikelDelete);

module.exports = router;