const jwt = require('jsonwebtoken')
const env = require('../../infrastructure/config/environment')

module.exports = class TokenHandler {
  generate (payload) {
    const token = jwt.sign({ payload }, env.JWT_SECRET, {
      expiresIn: 1800
    })

    return token
  }

  tokenStatus (token) {
    const isTokenValid = jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.message === 'invalid signature') {
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
  }
}
