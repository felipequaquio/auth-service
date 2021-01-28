const bcrypt = require('bcrypt')
const InternalServerError = require('../../utils/errors/internal-server-error')

module.exports = class PasswordEncrypter {
  passwordHash (password) {
    try {
      const passwordHashed = bcrypt.hashSync(password, 10)

      return passwordHashed
    } catch (error) {
      throw new InternalServerError()
    }
  }

  async comparePasswords (password, passwordHashed) {
    try {
      const arePasswordsAreEquals = await bcrypt.compare(password, passwordHashed)

      if (arePasswordsAreEquals) {
        return true
      }

      return false
    } catch (error) {
      throw new InternalServerError()
    }
  }
}
