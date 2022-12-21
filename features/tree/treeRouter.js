'use strict'

const { Router } = require('express')

const { getTreePage, postCreateTree, postRemoveTree } = require('./treeController')

const treeRouter = new Router()

treeRouter
    .get('/:id', getTreePage)

treeRouter
    .post('/create', postCreateTree)

treeRouter
    .post('/remove/:id', postRemoveTree)

module.exports = treeRouter
