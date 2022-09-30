'use strict'

const { Router } = require('express')

const userController = require('../controllers/userController')
const tryCatchWrapper = require('../middleware/tryCatchWrapper')

const userRouter = new Router()

userRouter.get('/profile', tryCatchWrapper(userController.getProfilePage))

module.exports = userRouter
