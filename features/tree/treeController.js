'use strict'

const { ObjectId } = require('mongoose').Types

const Tree = require('./Tree')
const User = require('./../user/User')

exports.postCreateTree = async (req, res, next) => {
    try {
        const currentUserId = req.session.passport?.user
        const currentUser = await User.findById(currentUserId)
        // FIXME: add passport.authenticate middleware!
        if (!currentUser) {
            return res
                .status(401)
                .json({
                    error: 'Please log in'
                })
        }
        const treeTitle = req.body.title
        if (!treeTitle) {
            return res
                .status(422)
                .json({
                    error: 'Please provide tree title!'
                })
        }
        const newTree = await Tree.create({
            owner: currentUserId,
            title: treeTitle
        })
        currentUser.trees.push(newTree.id)
        await currentUser.save()
        return res
            .redirect(`/tree/${newTree.id}`)
    } catch (err) {
        return next(err)
    }
}


exports.postRemoveTree = async (req, res, next) => {
    try {
        const currentUserId = req.session.passport?.user
        const currentUser = await User.findById(currentUserId)
        // FIXME: add passport.authenticate middleware!
        if (!currentUser) {
            return res
                .status(401)
                .json({
                    error: 'Please log in'
                })
        }
        const treeId = req.params.id
        const tree = await Tree.findById(treeId)
        if (!tree) {
            return res
                .status(404)
                .json({
                    error: 'No content'
                })
        }
        tree.delete()
        await User.updateOne({ _id: currentUser.id }, {
            $pull: {
                trees: new ObjectId(treeId)
            }
        })
        return res
            .redirect('/user/profile')
    } catch (err) {
        next()
    }
}


exports.getTreePage = async (req, res, next) => {
    // const tree = await Tree.findById(req.params.id).populate('persons')
    const tree = { // FIXME: for testing purposes only!
        title: '',
        persons: []
    }
    res.render('tree', {
        title: tree.title,
        tree
    })
    // next()
}

