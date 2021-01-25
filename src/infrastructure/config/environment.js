require('dotenv').config()

const APP_PORT = process.env.APP_PORT
const DB_LOCAL_URI = process.env.DB_LOCAL_URI
const DB_LOCAL_DOCKER_URI = process.env.DB_LOCAL_DOCKER_URI
const DB_NAME = process.env.DB_NAME
const JWT_SECRET = process.env.JWT_SECRET
const USING_DOCKER = process.env.USING_DOCKER
const DB_URI = USING_DOCKER === 'true' ? DB_LOCAL_DOCKER_URI : DB_LOCAL_URI

module.exports = {
  APP_PORT: APP_PORT,
  DB_URI: DB_URI,
  DB_NAME: DB_NAME,
  JWT_SECRET: JWT_SECRET,
  USING_DOCKER: USING_DOCKER
}
