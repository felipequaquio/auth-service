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

  async create (request, response) {
    try {
      const data = request.body

      if (!data.nome) {
        return response.status(400)
          .json(HttpResponse.badRequest(new MissingParamError('nome')))
      }

      if (!data.email) {
        return response.status(400)
          .json(HttpResponse.badRequest(new MissingParamError('email')))
      }

      if (!data.senha) {
        return response.status(400)
          .json(HttpResponse.badRequest(new MissingParamError('senha')))
      }

      if (!data.telefones) {
        return response.status(400)
          .json(HttpResponse.badRequest(new MissingParamError('telefones')))
      }

      const user = await this.createUserUseCase.create(data)

      if (!user) {
        return response.status(409)
          .json(HttpResponse.conflict(new ConflictError('email')))
      }

      return response.status(201).json({
        id: user._id,
        data_criacao: user.data_criacao,
        data_atualizacao: user.data_atualizacao,
        ultimo_login: user.ultimo_login,
        token: user.token
      })
    } catch (error) {
      return response.status(500)
        .json(HttpResponse.internalServerError(new InternalServerError()))
    }
  }

  async signIn (request, response) {
    try {
      const data = request.body

      const userIsSigned = await this.signInUseCase.signIn(data)

      if (userIsSigned) {
        return response.status(200).json({
          id: userIsSigned._id,
          data_criacao: userIsSigned.data_criacao,
          data_atualizacao: userIsSigned.data_atualizacao,
          ultimo_login: userIsSigned.ultimo_login,
          token: userIsSigned.token
        })
      }

      return response.status(401)
        .json(HttpResponse.unauthorized(new UnauthorizedError()))
    } catch (error) {
      return response.status(500)
        .json(HttpResponse.internalServerError(new InternalServerError()))
    }
  }

  async getUserById (request, response) {
    try {
      const bearerToken = request.headers.authorization
      const token = bearerToken.replace('Bearer ', '')
      const { id } = request.params

      const user = await this.getUserByIdUseCase.getUser(id, token)

      if (user) {
        return response.json(user)
      }

      return response.status(401).json({
        mensagem: 'Permissão negada para acessar este recurso.'
      })
    } catch (error) {
      return response.status(500)
        .json(HttpResponse.internalServerError(new InternalServerError()))
    }
  }
}
