const app = require('../config/app')
const env = require('../config/environment')
require('../orm/mongoose/mongoose')

app.listen(env.APP_PORT)
