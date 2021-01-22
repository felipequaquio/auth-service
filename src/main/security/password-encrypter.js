const bcrypt = require('bcrypt')

module.exports = class PasswordEncrypter {
  async passwordHash (password) {
    const passwordHashed = await bcrypt.hashSync(password, 10)

    return passwordHashed
  }

  async passwordEquals (password, passwordHashed) {
    const passwordsAreEquals = await bcrypt.compare(password, passwordHashed)
    if (passwordsAreEquals) {
      return true
    }

    return false
  }
}
