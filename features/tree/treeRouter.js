'use strict'

const { Router } = require('express')

const { getTreePage, postCreateTree, postRemoveTree } = require('./treeController')

const treeRouter = new Router()

treeRouter
    .get('/:id', getTreePage)

treeRouter
    .post('/create', postCreateTree)

treeRouter
    .post('/:id/remove', postRemoveTree)

module.exports = treeRouter
