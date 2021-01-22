const UserRepository = require('../../infrastructure/repositories/user-repository')

module.exports = class UpdateUserUseCase {
  async update (userData) {
    const userRepository = new UserRepository()
    const user = await userRepository.update(userData)

    return user
  }
}
