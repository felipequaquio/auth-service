const mongooseUserSchema = require('../orm/mongoose/schemas/user-schema')

module.exports = class UserRepository {
  async getUserById (id) {
    const user = await mongooseUserSchema.find({ _id: id })

    return user[0]
  }

  async create (userData) {
    const user = await mongooseUserSchema.create(userData)

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
