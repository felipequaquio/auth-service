module.exports = class InternalServerError extends Error {
  constructor () {
    super('Erro ao processar a requisição.')
  }
}
