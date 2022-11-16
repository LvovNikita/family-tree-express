'use strict'

const morgan = require('morgan')

const logger = morgan(`
    :method 
    :url
    :body
    :status
    :response-time ms
    :req[Cookie]
    :session 
`)

morgan.token('body', req => JSON.stringify(req.body))
morgan.token('session', req => JSON.stringify(req.session))

module.exports = logger
