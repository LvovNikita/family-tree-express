'use strict'

const { Router } = require('express')

const authController = require('../controllers/authController')

const authRouter = new Router()

authRouter
    .get('/register', authController.getRegisterPage)
    .get('/login', authController.getLoginPage)
    .get('/logout', authController.logout)

authRouter
    .post('/register', (req, res, next) => {})
    .post('/login', (req, res, next) => {})

module.exports = authRouter
