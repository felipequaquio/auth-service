const jwt = require('jsonwebtoken')
const env = require('../../infrastructure/config/environment')
const InternalServerError = require('../../utils/errors/internal-server-error')

module.exports = class TokenHandler {
  generate (payload) {
    try {
      const token = jwt.sign({ payload }, env.JWT_SECRET, {
        expiresIn: 1800
      })

      return token
    } catch (error) {
      throw new InternalServerError()
    }
  }

  tokenStatus (token) {
    try {
      const isTokenValid = jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
        if (err) {
          if (
            err.message === 'invalid signature' ||
            err.message === 'jwt malformed' ||
            err.message === 'invalid token'
          ) {
            return {
              status: 'invalid',
              message: 'Token inválido',
              payload: null
            }
          }

          if (err.message === 'jwt expired') {
            return {
              status: 'invalid',
              message: 'Token expirado',
              payload: null
            }
          }
        }

        return {
          status: 'valid',
          message: 'Token válido',
          payload: decoded.payload
        }
      })

      return isTokenValid
    } catch (error) {
      throw new InternalServerError()
    }
  }
}
