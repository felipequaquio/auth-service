module.exports = class DuplicatedData extends Error {
  constructor (paramName) {
    super(`Este ${paramName} já está em uso.`)
  }
}
