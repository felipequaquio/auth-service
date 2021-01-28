module.exports = class ExpressAdapter {
  static adapt (controllerMethod) {
    return async (request, response) => {
      const httpRequest = {
        body: request.body,
        headers: request.headers,
        params: request.params
      }
      const controllerResponse = await controllerMethod(httpRequest)

      const httpResponse = {
        statusCode: controllerResponse.statusCode,
        body: controllerResponse.body
      }

      return response.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}
