const InternalServerError = require('../../utils/errors/internal-server-error')

module.exports = class SignInUseCase {
  constructor (userRepository, tokenHandler, passwordEncrypter) {
    this.userRepository = userRepository
    this.tokenHandler = tokenHandler
    this.passwordEncrypter = passwordEncrypter
  }

  async signIn (httpRequestUserData) {
    try {
      const { email, senha } = httpRequestUserData

      const user = await this.userRepository.findUserByEmail(email)

      if (user) {
        const passwordIsValid = await this.passwordEncrypter
          .comparePasswords(senha, user.senha)

        if (!passwordIsValid) {
          return null
        }

        const token = await this.tokenHandler.generate(email)

        const currentDate = Date.now()

        const userUpdated = await this.userRepository.update({
          _id: user.id, token, ultimo_login: currentDate, data_atualizacao: currentDate
        })

        return userUpdated
      }

      return null
    } catch (error) {
      throw new InternalServerError()
    }
  }
}
