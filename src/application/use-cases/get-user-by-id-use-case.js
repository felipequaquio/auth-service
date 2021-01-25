module.exports = class GetUserUseCase {
  constructor (userRepository) {
    this.userRepository = userRepository
  }

  async getUser (id, token) {
    const user = await this.userRepository.getUserById(id)

    if (user && user[0].token === token) {
      return user
    }

    return null
  }
}
