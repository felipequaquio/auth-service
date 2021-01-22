const UserRepository = require('../main/repositories/user-repository')

module.exports = class CreateUserUseCase {
  async create (httpRequestUserData) {
    const userRepository = new UserRepository()

    const user = await userRepository.create(httpRequestUserData)

    return user
  }
}
