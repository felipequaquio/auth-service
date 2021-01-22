const mongooseUserSchema = require('../orm/mongoose/schemas/user-schema')

module.exports = class UserRepository {
  async create (userData) {
    const { nome, email, senha, telefones, token } = userData
    const ultimoLogin = Date.now()
    const user = await mongooseUserSchema.create({
      nome, email, senha, telefones, ultimo_login: ultimoLogin, token
    })

    return user
  }

  async findUserByEmail (email) {
    const user = await mongooseUserSchema.findOne({ email })

    return user
  }
}
