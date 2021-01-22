const bcrypt = require('bcrypt')

module.exports = class PasswordHasher {
  async passwordHash (password) {
    const passwordHashed = await bcrypt.hashSync(password, 10)

    return passwordHashed
  }
}
