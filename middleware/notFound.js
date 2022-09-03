module.exports = (req, res, next) => {
    res
        .status(400)
        .render('error', {
            statusCode: 404,
            errorMessage: 'Not Found'
        })
}
