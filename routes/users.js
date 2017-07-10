const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')

router.post('/signup', userController.signup)
router.post('/sigin', userController.signup)
router.post('/', userController.insertUser)
router.get('/', userController.findAllUsers)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)



module.exports = router
