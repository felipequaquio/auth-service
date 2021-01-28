const router = require('express').Router()
const userControllerFactory = require('../controllers/factories/user-controller-factory')
const expressAdapter = require('../adapters/express-adapter')
const verifyTokenMidleware = require('../../infrastructure/midlewares/verify-token')

router.post('/signup', expressAdapter.adapt(userControllerFactory.getInstance().create))
router.post('/signin', expressAdapter.adapt(userControllerFactory.getInstance().signIn))
router.get(
  '/user/:id',
  verifyTokenMidleware,
  expressAdapter.adapt(userControllerFactory.getInstance().getUserById)
)

module.exports = router
