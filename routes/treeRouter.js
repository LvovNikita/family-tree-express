'use strict'

const { Router } = require('express')

// const wrapper = require('./wrapper.js')
const Tree = require('../models/Tree')
const User = require('../models/User')

const treeRouter = new Router()

treeRouter.post('/create', async (req, res, next) => {
    const currentUser = await User.findOne({}) // FIXME: get current user from session
    const newTree = await Tree.create({
        owner: currentUser.id,
        title: req.body.title || 'New Family Tree'
    })
    currentUser.trees.push(newTree.id)
    await currentUser.save()
    return res.redirect('/profile')
})

treeRouter.get('/:id', (req, res, next) => {
    res.send(`Tree ${req.params.id}`)
})

module.exports = treeRouter
