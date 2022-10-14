'use strict'

const morgan = require('morgan')

function loggerFabric (moduleName) {
    let logger

    if (moduleName === 'morgan') {
        let options = {
            ':method': true,
            ':status': true,
            ':url': true,
            ':req[Cookie]': false,
            ':req[Authorization]': true,
            ':req[WWW-Authenticate]': true
        }
        options = Object.keys(options).reduce((prev, curr) => {
            return options[curr] ? prev + curr + ' ' : prev
        }, '')
        logger = morgan(options)
    }

    if (moduleName === 'body') {
        logger = (req, res, next) => {
            if (req.method === 'POST') {
                console.log(JSON.stringify(req.body))
            }
            next()
        }
    }

    if (moduleName === 'session') {
        logger = (req, res, next) => {
            if (req.session) {
                console.log(req.session)
            }
            next()
        }
    }

    if (!logger) {
        throw new ReferenceError('Please provide logging module name: morgan, body or session')
    }

    return logger
}

module.exports = loggerFabric
