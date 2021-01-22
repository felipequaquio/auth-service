module.exports = class DuplicatedData extends Error {
  constructor (paramName) {
    super(`O campo ${paramName} já está em uso.`)
  }
}
