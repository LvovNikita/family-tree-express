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
    postLoginCredentials: async (req, res, next) => {
        if (!req.body.username || !req.body.password) {
            return res
                .status(422)
                .json({ error: 'Please provide username and password' })
        }
        const { username, password } = req.body
        const authResult = await User.login(username, password)
        if (authResult.err) {
            return res
                .status(500)
                .json({ error: authResult.err })
        }
        if (!authResult.user) {
            return res
                .status(401)
                .json({ error: 'Invalid credentials' })
        }
        req.session.user = { _id: authResult.user.id }
        return res
            .status(302)
            .redirect('/user/profile') // TODO: redirect to user profile
    },
    logout: (req, res, next) => {
        req.session.destroy()
        res
            .redirect('/') // TODO:
    }
}

module.exports = authController
