const mongoose = require('mongoose')
const env = require('../../config/environment')
const dbUri = env.DB_URI
const dbName = env.DB_NAME

mongoose.connect(`${dbUri}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error: '))
db.on('connected', console.info.bind(console, 'Database sucessfully connected'))

module.exports = mongoose
