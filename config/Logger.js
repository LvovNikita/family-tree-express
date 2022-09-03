'use strict'

function loggerFabric (moduleName) {
    let logger
    if (moduleName === 'morgan') {
        let options = {
            ':method': true,
            ':status': true,
            ':url': true,
            ':req[Cookie]': true,
            ':req[Authorization]': true,
            ':req[WWW-Authenticate]': true
        }
        options = Object.keys(options).reduce((prev, curr) => {
            return options[curr] ? prev + curr + ' ' : ''
        }, '')
        logger = require('morgan')(options)
    }
    if (moduleName === 'session') {
        logger = (req, res, next) => {
            if (req.session) {
                console.log('Session:\n' + req.session)
            }
            next()
        }
    }
    return logger
}

// let logger = (req, res, next) => { return next() }

module.exports = loggerFabric
