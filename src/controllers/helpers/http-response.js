module.exports = {
  badRequest (error) {
    return {
      mensagem: error.message
    }
  },

  conflict (error) {
    return {
      mensagem: error.message
    }
  }
}
