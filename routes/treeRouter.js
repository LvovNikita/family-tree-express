'use strict'

const { Router } = require('express')

const treeController = require('../controllers/treeController')

const treeRouter = new Router()

treeRouter.post('/create', treeController.postCreateTree)
treeRouter.post('/remove/:id', treeController.postRemoveTree)
treeRouter.get('/:id', treeController.getTreeById)

module.exports = treeRouter
