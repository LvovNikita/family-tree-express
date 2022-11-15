'use strict'

const { Router } = require('express')

const userController = require('./userController')
const tryCatchWrapper = require('../../utils/tryCatchWrapper')

const userRouter = new Router()

userRouter.get('/profile', tryCatchWrapper(userController.getProfilePage))

module.exports = userRouter
