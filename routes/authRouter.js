'use strict'

const { Router } = require('express')

const authController = require('../controllers/authController')

const authRouter = new Router()

authRouter.route('/register')
    .get(authController.getRegisterPage)
    .post(authController.postRegisterCredentials)

authRouter.route('/login')
    .get(authController.getLoginPage)
    .post(authController.postLoginCredentials)

authRouter.route('/logout')
    .get(authController.logout)

module.exports = authRouter
