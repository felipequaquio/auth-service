const HttpResponse = require('../../utils/helpers/http-response')
const MissingParamError = require('../../utils/errors/missing-param-error')
const ConflictError = require('../../utils/errors/conflict-error')
const UnauthorizedError = require('../../utils/errors/unauthorized-error')
const InternalServerError = require('../../utils/errors/internal-server-error')

module.exports = class UserController {
  constructor (createUserUseCase, signInUseCase, getUserByIdUseCase) {
    this.createUserUseCase = createUserUseCase
    this.signInUseCase = signInUseCase
    this.getUserByIdUseCase = getUserByIdUseCase
    this.create = this.create.bind(this)
    this.signIn = this.signIn.bind(this)
    this.getUserById = this.getUserById.bind(this)
  }

  async create (httpRequest) {
    try {
      const data = httpRequest.body

      if (!data.nome) {
        return HttpResponse.badRequest(new MissingParamError('nome'))
      }

      if (!data.email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }

      if (!data.senha) {
        return HttpResponse.badRequest(new MissingParamError('senha'))
      }

      if (!data.telefones) {
        return HttpResponse.badRequest(new MissingParamError('telefones'))
      }

      const user = await this.createUserUseCase.create(data)

      if (!user) {
        return HttpResponse.conflict(new ConflictError('email'))
      }

      return HttpResponse.created({
        id: user._id,
        data_criacao: user.data_criacao,
        data_atualizacao: user.data_atualizacao,
        ultimo_login: user.ultimo_login,
        token: user.token
      })
    } catch (error) {
      return HttpResponse.internalServerError(new InternalServerError())
    }
  }

  async signIn (httpRequest) {
    try {
      const data = httpRequest.body

      const userIsSigned = await this.signInUseCase.signIn(data)

      if (userIsSigned) {
        return HttpResponse.success({
          id: userIsSigned._id,
          data_criacao: userIsSigned.data_criacao,
          data_atualizacao: userIsSigned.data_atualizacao,
          ultimo_login: userIsSigned.ultimo_login,
          token: userIsSigned.token
        })
      }

      return HttpResponse.unauthorized(new UnauthorizedError())
    } catch (error) {
      HttpResponse.internalServerError(new InternalServerError())
    }
  }

  async getUserById (httpRequest) {
    try {
      const bearerToken = httpRequest.headers.authorization
      const token = bearerToken.replace('Bearer ', '')
      const { id } = httpRequest.params

      const user = await this.getUserByIdUseCase.getUserById(id, token)

      if (user) {
        return HttpResponse.success(user)
      }

      return HttpResponse.unauthorized(new UnauthorizedError())
    } catch (error) {
      return HttpResponse.internalServerError(new InternalServerError())
    }
  }
}
