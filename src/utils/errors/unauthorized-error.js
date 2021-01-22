module.exports = class UnauthorizedError extends Error {
  constructor () {
    super('Usuário ou senha inválidos')
  }
}
