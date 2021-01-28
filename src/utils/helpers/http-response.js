module.exports = {
  created (data) {
    return {
      statusCode: 201,
      body: data
    }
  },

  success (data) {
    return {
      statusCode: 200,
      body: data
    }
  },

  badRequest (error) {
    return {
      statusCode: 400,
      body: {
        mensagem: error.message
      }
    }
  },

  conflict (error) {
    return {
      statusCode: 409,
      body: {
        mensagem: error.message
      }
    }
  },

  unauthorized (error) {
    return {
      statusCode: 409,
      body: {
        mensagem: error.message
      }
    }
  },

  internalServerError (error) {
    return {
      statusCode: 500,
      body: {
        mensagem: error.message
      }
    }
  }
}
