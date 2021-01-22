const router = require('express').Router()
const UserController = require('../../interfaces/controllers/user-controller')
const verifyTokenMidleware = require('../../infrastructure/midlewares/verify-token')

const userController = new UserController()

router.get('/user/:id', verifyTokenMidleware, userController.getUser)
router.post('/signup', userController.create)
router.post('/signin', userController.signIn)

module.exports = router
