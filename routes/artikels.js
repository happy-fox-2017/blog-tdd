const express = require('express')
var router = express.Router()
const BlogControl = require('../controllers/artikel_controller')

router.post('/', BlogControl.createArtikel)
router.get('/', BlogControl.getAllArtikel)
router.put('/:id', BlogControl.updateArtikel)
router.delete('/:id', BlogControl.deleteArtikel)



module.exports = router
