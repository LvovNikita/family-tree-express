module.exports = (req, res, next) => {
    res
        .status(404)
        .end('404: Not Found')
}
