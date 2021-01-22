const HttpResponse = require('../../utils/helpers/http-response')
const MissingParamError = require('../../utils/errors/missing-param-error')
const ConflictError = require('../../utils/errors/conflict-error')
const UnauthorizedError = require('../../utils/errors/unauthorized-error')
const CreateUserUseCase = require('../../application/use-cases/create-user-use-case')
const UpdateUserUseCase = require('../../application/use-cases/update-user-use-case')
const GetUserUseCase = require('../../application/use-cases/get-user-use-case')
const FindUserByEmailUseCase = require('../../application/use-cases/find-user-by-email-use-case')
const PasswordEncrypter = require('../../application/security/password-encrypter')
const TokenHandler = require('../../application/security/token-handler')

module.exports = class UserController {
  async create (request, response) {
    try {
      const { nome, email, senha, telefones } = request.body

      if (!nome) {
        return response.status(400)
          .json(HttpResponse.badRequest(new MissingParamError('nome')))
      }

      if (!email) {
        return response.status(400)
          .json(HttpResponse.badRequest(new MissingParamError('email')))
      }

      if (!senha) {
        return response.status(400)
          .json(HttpResponse.badRequest(new MissingParamError('senha')))
      }

      if (!telefones) {
        return response.status(400)
          .json(HttpResponse.badRequest(new MissingParamError('telefones')))
      }

      const userExists = await new FindUserByEmailUseCase().findUserByEmail(email)

      if (userExists) {
        return response.status(409)
          .json(HttpResponse.conflict(new ConflictError('email')))
      }

      const token = await new TokenHandler().generate(email)

      const hashedPassword = await new PasswordEncrypter().passwordHash(senha)

      const user = await new CreateUserUseCase().create({
        nome, email, senha: hashedPassword, telefones, token
      })

      return response.status(201).json({
        id: user._id,
        data_criacao: user.data_criacao,
        data_atualizacao: user.data_atualizacao,
        ultimo_login: user.ultimo_login,
        token: user.token
      })
    } catch (error) {
      return response.status(500)
    }
  }

  async signIn (request, response) {
    const { email, senha } = request.body

    const user = await new FindUserByEmailUseCase().findUserByEmail(email)

    if (!user) {
      return response.status(401)
        .json(HttpResponse.unauthorized(new UnauthorizedError()))
    }

    const passwordIsValid = await new PasswordEncrypter()
      .passwordEquals(senha, user.senha)

    if (passwordIsValid) {
      const token = new TokenHandler().generate(email)

      const currentDate = Date.now()

      const userUpdated = await new UpdateUserUseCase().update({
        _id: user.id, token, ultimo_login: currentDate, data_atualizacao: currentDate
      })

      return response.status(200).json({
        id: userUpdated._id,
        data_criacao: userUpdated.data_criacao,
        data_atualizacao: userUpdated.data_atualizacao,
        ultimo_login: userUpdated.ultimo_login,
        token: userUpdated.token
      })
    }

    return response.status(401)
      .json(HttpResponse.unauthorized(new UnauthorizedError()))
  }

  async getUser (request, response) {
    try {
      const bearerToken = request.headers.authorization
      const token = bearerToken.replace('Bearer ', '')
      const { id } = request.params

      const getUserUseCase = new GetUserUseCase()

      const user = await getUserUseCase.getUser(id)

      if (user && user[0].token === token) {
        return response.json(user)
      }

      return response.status(401).json({
        mensagem: 'Permissão negada para acessar este recurso.'
      })
    } catch (error) {
      return response.status(500)
    }
  }
}
