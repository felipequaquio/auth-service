const jwt = require('jsonwebtoken')
const env = require('../config/environment')

module.exports = class TokenHandler {
  async generate (payload) {
    const token = await jwt.sign({ payload }, env.JWT_SECRET, {
      expiresIn: env.TOKEN_EXPIRES_IN
    })

    return token
  }
}
