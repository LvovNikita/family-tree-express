'use strict'

const authController = {
    getRegisterPage: (req, res, next) => {
        try {
            res
                .status(200)
                .render('register', {
                    title: 'Register',
                    formActionSlug: '/auth/register'
                })
        } catch (err) {
            next(err)
        }
    },
    postRegisterCredentials: (req, res, next) => {
        res.redirect('/auth/login')
    },
    getLoginPage: (req, res, next) => {
        try {
            res
                .status(200)
                .render('login', {
                    title: 'Login',
                    formActionSlug: '/auth/login'
                })
        } catch (err) {
            next(err)
        }
    },
    postLoginCredentials: (req, res, next) => {
        res.redirect('/')
    },
    logout: (req, res, next) => {
        res
            .redirect('/')
    }
}

module.exports = authController
