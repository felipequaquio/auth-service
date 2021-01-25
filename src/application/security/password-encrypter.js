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

  async passwordEquals (password, passwordHashed) {
    const passwordsAreEquals = await bcrypt.compare(password, passwordHashed)
    if (passwordsAreEquals) {
      return true
    }

    return false
  }
}
