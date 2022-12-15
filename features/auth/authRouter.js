'use strict'

const passport = require('passport')

const { Router } = require('express')

const {
    getLoginPage,
    getRegisterPage,
    postRegisterCredentials,
    postLoginCredentials,
    logout,
    getPasswordResetPage,
    postPasswordResetCredentials,
    getNewPasswordPage,
    postNewPassword
} = require('./authController')

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

authRouter.route('/passwordReset')
    .get(getPasswordResetPage)
    .post(postPasswordResetCredentials)

authRouter.route('/newPassword/:token')
    .get(getNewPasswordPage)
    .post(postNewPassword)


module.exports = authRouter
