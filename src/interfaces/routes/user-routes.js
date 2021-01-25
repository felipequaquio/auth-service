const router = require('express').Router()
const userControllerFactory = require('../factories/user-controller-factory')
const verifyTokenMidleware = require('../../infrastructure/midlewares/verify-token')

router.post('/signup', userControllerFactory.getInstance().create)
router.post('/signin', userControllerFactory.getInstance().signIn)
router.get('/user/:id', verifyTokenMidleware, userControllerFactory.getInstance().getUserById)

module.exports = router
