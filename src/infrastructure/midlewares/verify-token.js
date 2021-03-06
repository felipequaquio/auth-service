const TokenHandler = require('../../application/security/token-handler')
const HttpResponse = require('../../utils/helpers/http-response')
const MissingParamError = require('../../utils/errors/missing-param-error')

module.exports = async (request, response, next) => {
  const bearerToken = request.headers.authorization

  if (!bearerToken) {
    return response.status(400)
      .json(HttpResponse.badRequest(new MissingParamError('Token')))
  }
  const token = bearerToken.replace('Bearer ', '')

  const tokenStatus = new TokenHandler().tokenStatus(token)

  if (tokenStatus.status === 'invalid') {
    return response.status(401).json({ mensagem: tokenStatus.message })
  }

  request.userMail = tokenStatus.payload

  next()
}
