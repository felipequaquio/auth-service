const UserRepository = require('../../infrastructure/repositories/user-repository')

module.exports = class FindUserByEmailUseCase {
  async findUserByEmail (email) {
    const userRepository = new UserRepository()
    const user = await userRepository.findUserByEmail(email)

    return user
  }
}
