'use strict'

const { ObjectId } = require('mongoose').Types

const Tree = require('../models/Tree')
const User = require('../models/User')

const treeController = {
    postCreateTree: async (req, res, next) => {
        const currentUser = await User.findOne({ _id: req.session.user._id })
        const newTree = await Tree.create({
            owner: currentUser.id,
            title: req.body.title || 'New Family Tree'
        }) // TODO: catch
        currentUser.trees.push(newTree.id)
        await currentUser.save()
        return res.redirect('/user/profile')
    },
    postRemoveTree: async (req, res, next) => {
        const currentUser = await User.findOne({ _id: req.session.user._id })
        await User.updateOne({ _id: currentUser.id }, {
            $pull: {
                trees: new ObjectId(req.params.id)
            }
        }) // FIXME: get current user from session TODO: catch
        await Tree.deleteOne({
            _id: req.params.id
        }) // TODO: catch
        return res.redirect('/user/profile')
    },
    getTreeById: async (req, res, next) => {
        const tree = await Tree.findById(req.params.id).populate('persons')
        res.render('tree', {
            title: tree.title,
            tree
        })
    }
}

module.exports = treeController
