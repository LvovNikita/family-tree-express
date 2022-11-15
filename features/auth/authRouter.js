'use strict'

const { Router } = require('express')

const { getLoginPage, getRegisterPage, postLoginCredentials, postRegisterCredentials } = require('./authController')

const authRouter = new Router()

authRouter.route('/register')
    .get(getRegisterPage)
    .post(postRegisterCredentials)

authRouter.route('/login')
    .get(getLoginPage)
    .post(postLoginCredentials)

// authRouter.route('/logout')
//     .get(authController.logout)

module.exports = authRouter
