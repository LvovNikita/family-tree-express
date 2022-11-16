'use strict'

// const { ObjectId } = require('mongoose').Types

const Tree = require('./Tree')
const User = require('./../user/User')

exports.postCreateTree = async (req, res, next) => {
    // TODO: check if authenticated
    // TODO: try/catch

    const currentUserId = req.session.passport.user

    const currentUser = await User
        .findById(currentUserId)

    const newTree = await Tree.create({
        owner: currentUserId,
        title: req.body.title || 'New Family Tree'
    })

    currentUser
        .trees
        .push(newTree.id)

    await currentUser.save()

    // return res.redirect('/user/profile')

    next()
}


exports.postRemoveTree = async (req, res, next) => {
    // const currentUser = await User.findOne({ _id: req.session.user._id })
    // await User.updateOne({ _id: currentUser.id }, {
    //     $pull: {
    //         trees: new ObjectId(req.params.id)
    //     }
    // }) // FIXME: get current user from session TODO: catch
    // await Tree.deleteOne({
    //     _id: req.params.id
    // }) // TODO: catch
    // return res.redirect('/user/profile')
    next()
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
    next()
}

