'use strict'

const { MIN_USER_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } = require('../config/env')
const User = require('../models/User')

const authController = {
    getRegisterPage: (req, res, next) => {
        res
            .status(200)
            .render('register', {
                title: 'Register',
                formActionSlug: '/auth/register',
                passwordLength: MIN_USER_PASSWORD_LENGTH,
                usernameLength: MIN_USERNAME_LENGTH
            })
    },
    postRegisterCredentials: (req, res, next) => {
        if (!req.body.username || !req.body.password) {
            return res
                .status(422)
                .json({ error: 'Please provide username and password' })
        }
        User.register(req.body.username, req.body.password)
        res.redirect('/auth/login')
    },
    getLoginPage: (req, res, next) => {
        res
            .status(200)
            .render('login', {
                title: 'Login',
                formActionSlug: '/auth/login',
                passwordLength: MIN_USER_PASSWORD_LENGTH,
                usernameLength: MIN_USERNAME_LENGTH
            })
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
