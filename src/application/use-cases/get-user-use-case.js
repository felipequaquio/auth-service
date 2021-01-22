const UserRepository = require('../../infrastructure/repositories/user-repository')

module.exports = class GetUserUseCase {
  async getUser (id) {
    const userRepository = new UserRepository()

    const user = await userRepository.getUser(id)

    return user
  }
}
