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
  },

  unauthorized (error) {
    return {
      mensagem: error.message
    }
  },

  internalServerError (error) {
    return {
      mensagem: error.message
    }
  }
}
