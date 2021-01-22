const mongooseUserSchema = require('../orm/mongoose/schemas/user-schema')

module.exports = class UserRepository {
  async getUser (id) {
    const user = await mongooseUserSchema.find({ _id: id })

    return user
  }

  async create (userData) {
    const { nome, email, senha, telefones, token } = userData
    const ultimoLogin = Date.now()
    const user = await mongooseUserSchema.create({
      nome, email, senha, telefones, ultimo_login: ultimoLogin, token
    })

    return user
  }

  async update (userData) {
    const data = userData
    const filter = data._id

    delete data._id

    const user = await mongooseUserSchema
      .findOneAndUpdate(filter, data, { new: true })

    return user
  }

  async findUserByEmail (email) {
    const user = await mongooseUserSchema.findOne({ email })

    return user
  }
}
