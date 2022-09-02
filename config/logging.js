'use strict'

const { NODE_ENV } = require('./env')

let logger = (req, res, next) => { return next() }

if (NODE_ENV === 'development') {
    logger = require('morgan')(':method :url :status :res[Cookie] :res[WWW-Authenticate] ')  
}

module.exports = logger