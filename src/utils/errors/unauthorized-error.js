module.exports = class UnauthorizedError extends Error {
  constructor () {
    super('Usuário ou senha inválidos ou permissão não concedida para acessar o recurso')
  }
}
