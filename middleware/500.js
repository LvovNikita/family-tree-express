'use strict'

module.exports = (err, req, res, next) => {
    console.error(err.message)
    res
        .status(500)
        .render('error', {
            statusCode: 500,
            // TODO: just for testing purposes:
            errorMessage: 'Internal Server Error: ' + err.message
        })
}
