module.exports = (request, response, next) => {
  return response.status(404).json({
    mensagem: 'Endpoint inválido.'
  })
}
