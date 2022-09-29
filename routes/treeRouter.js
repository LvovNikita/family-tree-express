'use strict'

const { Router } = require('express')
const { ObjectId } = require('mongoose').Types

// const wrapper = require('./wrapper.js')
const Tree = require('../models/Tree')
const User = require('../models/User')

const treeRouter = new Router()

treeRouter.post('/create', async (req, res, next) => {
    const currentUser = await User.findOne({}) // FIXME: get current user from session
    const newTree = await Tree.create({
        owner: currentUser.id,
        title: req.body.title || 'New Family Tree'
    }) // TODO: catch
    currentUser.trees.push(newTree.id)
    await currentUser.save()
    return res.redirect('/profile')
})

treeRouter.post('/remove/:id', async (req, res, next) => {
    await User.updateOne({}, {
        $pull: {
            trees: new ObjectId(req.params.id)
        }
    }) // FIXME: get current user from session TODO: catch
    await Tree.deleteOne({
        _id: req.params.id
    }) // TODO: catch
    return res.redirect('/profile')
})

treeRouter.get('/:id', async (req, res, next) => {
    const tree = await Tree.findById(req.params.id)
    res.render('tree', {
        title: tree.title,
        tree
    })
})

module.exports = treeRouter
