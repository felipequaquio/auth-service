module.exports = (request, response, next) => {
  const accepts = request.is('json')
  const requestMethod = request.method

  if (!accepts && requestMethod !== 'GET') {
    response.status(406).json({
      mensagem: 'O servidor suporta apenas JSON.'
    })
  }

  next()
}
