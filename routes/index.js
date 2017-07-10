var express = require('express')
var router = express.Router()
var c_article = require('../controllers/c_article')
var c_user = require('../controllers/c_user')
router.get('/', function(req,res) {
  res.send('alive')
})


//crud
router.get('/api/articles', c_article.getAll)
router.post('/api/articles', c_article.create)
router.delete('/api/articles/:_id', c_article.remove)
router.put('/api/articles/:_id', c_article.edit)

// //userSchema
// router.get('/api/users', c_user.getAll)
// router.post('/api/users', c_user.create)
// router.delete('/api/users/:_id', c_user.remove)
// router.put('/api/users/:_id', c_user.edit)
//
// //LOGIN
router.post('/api/signin', c_user.signIn)
router.post('/api/signup', c_user.signUp)

module.exports = router
