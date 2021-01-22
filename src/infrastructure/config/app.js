const express = require('express')
const routes = require('../../interfaces/routes')
const invalidEndpoint = require('../midlewares/invalid-endpoint')
const requestTypesAcceptable = require('../midlewares/requests-types-acceptable')
const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(requestTypesAcceptable)
app.use(routes)
app.use(invalidEndpoint)

module.exports = app
