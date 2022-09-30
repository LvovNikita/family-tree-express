'use strict'

const { Router } = require('express')

const authController = require('../controllers/authController')
const tryCatchWrapper = require('../middleware/tryCatchWrapper')

const authRouter = new Router()

authRouter.route('/register')
    .get(tryCatchWrapper(authController.getRegisterPage))
    .post(tryCatchWrapper(authController.postRegisterCredentials))

authRouter.route('/login')
    .get(tryCatchWrapper(authController.getLoginPage))
    .post(tryCatchWrapper(authController.postLoginCredentials))

authRouter.route('/logout')
    .get(tryCatchWrapper(authController.logout))

module.exports = authRouter
