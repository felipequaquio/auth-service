module.exports = class GetUserByIdUseCase {
  constructor (userRepository) {
    this.userRepository = userRepository
  }

  async getUserById (id, token) {
    const user = await this.userRepository.getUserById(id)

    if (user && user.token === token) {
      return user
    }

    return null
  }
}
