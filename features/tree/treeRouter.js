'use strict'

const { Router } = require('express')

const treeController = require('./treeController')
const tryCatchWrapper = require('../../utils/tryCatchWrapper')

const treeRouter = new Router()

treeRouter.post('/create', tryCatchWrapper(treeController.postCreateTree))
treeRouter.get('/:id', tryCatchWrapper(treeController.getTreeById))
treeRouter.post('/remove/:id', tryCatchWrapper(treeController.postRemoveTree))

module.exports = treeRouter
