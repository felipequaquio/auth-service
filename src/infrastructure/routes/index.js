const router = require('express').Router()
const userRoutes = require('../routes/user-routes')

router.use(userRoutes)

module.exports = router
