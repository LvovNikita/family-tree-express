'use strict'

const morgan = require('morgan')

const logger = morgan(`
    :method 
    :url 
    :status
    :response-time ms
    :req[body] 
    :req[Cookie]
    :res[Set-Cookie]
    :req[session]
    :req[Authorization]
    :req[WWW-Authenticate]        
`)

module.exports = logger
