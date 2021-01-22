const UserRepository = require('../main/repositories/user-repository')

module.exports = class CreateUserUseCase {
  async findUserByEmail (email) {
    const userRepository = new UserRepository()
    const user = await userRepository.findUserByEmail(email)

    return user
  }
}
