require('dotenv').config()

module.exports = {
  APP_PORT: process.env.APP_PORT,
  DB_URI: process.env.DB_URI,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN
}
