module.exports = class MissingParamError extends Error {
  constructor (paramName) {
    super(`Parâmetro não informado: ${paramName}`)
  }
}
