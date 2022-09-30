'use strict'

// Wrap route handler inside try catch block

module.exports = fn => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (err) {
        next(err)
    }
}
