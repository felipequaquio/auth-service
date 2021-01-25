module.exports = class CreateUserUseCase {
  constructor (userRepository, tokenHandler, passwordEncrypter) {
    this.userRepository = userRepository
    this.tokenHandler = tokenHandler
    this.passwordEncrypter = passwordEncrypter
  }

  async create (httpRequestUserData) {
    const { nome, email, senha, telefones } = httpRequestUserData
    const userExists = await this.userRepository.findUserByEmail(email)

    if (userExists) {
      return null
    }

    const lastLogin = Date.now()
    const token = await this.tokenHandler.generate(email)
    const hashedPassword = await this.passwordEncrypter.passwordHash(senha)

    const user = await this.userRepository.create(
      { nome, email, senha: hashedPassword, ultimoLogin: lastLogin, telefones, token }
    )

    return user
  }
}
