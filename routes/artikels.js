const express = require('express')
var router = express.Router()
const BlogControl = require('../controllers/artikel_controller')

router.post('/', BlogControl.createArtikel)


module.exports = router
