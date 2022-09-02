'use strict'

const authController = {
    getRegisterPage: (req, res, next) => {
        try {
            res
            .status(200)
            .render('register', { title: 'Register' })
        } catch (err) {
            next(err)
        }
    },
    getLoginPage: (req, res, next) => {
        try {
            res
            .status(200)
            .render('login', { title: 'Login' })
        } catch (err) {
            next(err)
        }
    },
    logout: (req, res, next) => {
        res
        .redirect('/')
    }
}

module.exports = authController