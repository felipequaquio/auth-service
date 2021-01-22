const HttpResponse = require('./helpers/http-response')
const MissingParamError = require('./errors/missing-param-error')
const ConflictError = require('./errors/conflict-error')
const CreateUserUseCase = require('../use-cases/create-user-use-case')
const FindUserByEmailUseCase = require('../use-cases/find-user-by-email-use-case')
const PasswordHasher = require('../main/security/password-hasher')
const TokenHandler = require('../main/security/token-handler')

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

      const findUserByEmailUseCase = new FindUserByEmailUseCase()

      const userExists = await findUserByEmailUseCase.findUserByEmail(email)

      if (userExists) {
        return response.status(409)
          .json(HttpResponse.conflict(new ConflictError('email')))
      }

      const tokenHandler = new TokenHandler()

      const token = await tokenHandler.generate(email)

      const passwordHasher = new PasswordHasher()

      const hashedPassword = await passwordHasher.passwordHash(senha)

      const createUserUseCase = new CreateUserUseCase()

      const user = await createUserUseCase.create({
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
}
