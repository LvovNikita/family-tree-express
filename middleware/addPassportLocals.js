'use strict'

module.exports = (req, res, next) => {
    Object.assign(res.locals, {
        isAuthenticated: req.isAuthenticated()
    })
    return next()
}
