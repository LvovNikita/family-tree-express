'use strict'

const { Router } = require('express')

const mainController = require('../controllers/mainController')
const wrapper = require('./wrapper.js')

const mainRouter = new Router()

mainRouter.get('/', wrapper(mainController.getIndexPage))

module.exports = mainRouter
