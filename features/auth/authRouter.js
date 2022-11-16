'use strict'

const passport = require('passport')

const { Router } = require('express')

const { getLoginPage, getRegisterPage, postRegisterCredentials, postLoginCredentials, logout } = require('./authController')

const authRouter = new Router()


authRouter.route('/register')
    .get(getRegisterPage)
    .post(postRegisterCredentials)


authRouter.route('/login')
    .get(getLoginPage)
    .post(
        passport.authenticate('local', {
            failWithError: true, // FIXME:
            successRedirect: '/user/profile'
        }),
        postLoginCredentials
    )


authRouter.route('/logout')
    .get(logout)


module.exports = authRouter
