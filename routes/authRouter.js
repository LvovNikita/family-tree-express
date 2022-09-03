'use strict'

const { Router } = require('express')

const authController = require('../controllers/authController')
const wrapper = require('./wrapper')

const authRouter = new Router()

authRouter.route('/register')
    .get(wrapper(authController.getRegisterPage))
    .post(wrapper(authController.postRegisterCredentials))

authRouter.route('/login')
    .get(wrapper(authController.getLoginPage))
    .post(wrapper(authController.postLoginCredentials))

authRouter.route('/logout')
    .get(wrapper(authController.logout))

module.exports = authRouter
