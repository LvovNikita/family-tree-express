'use strict'

const { Router } = require('express')

const { getProfilePage } = require('./userController')

const userRouter = new Router()

userRouter.route('/profile')
    .get(getProfilePage)

module.exports = userRouter
