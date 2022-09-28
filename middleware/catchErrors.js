'use strict'

module.exports = (err, req, res, next) => {
    console.error(err.message)
    res
        .status(500)
        .render('error', {
            statusCode: 500,
            errorMessage: 'Internal Server Error'
        })
}
