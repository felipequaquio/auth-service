const router = require('express').Router()
const UserController = require('../../controllers/user-controller')
const userController = new UserController()

router.post('/signup', userController.create)

module.exports = router
