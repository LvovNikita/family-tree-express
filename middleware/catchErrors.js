module.exports = (err, req, res, next) => {
    console.error(err.message)
    res
        .status(500)
        .end('500: Internal Server Error')
}
