'use strict'

const { Router } = require('express')

const mainController = require('../controllers/mainController')
const tryCatchWrapper = require('../middleware/tryCatchWrapper.js')

const mainRouter = new Router()

mainRouter.get('/', tryCatchWrapper(mainController.getIndexPage))

module.exports = mainRouter
