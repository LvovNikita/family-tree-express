'use strict'

const Person = require('./Person')
const Tree = require('../tree/Tree')
// const User = require('../models/User')

const personController = {
    getCreatePersonPage: (req, res, next) => {
        res.render('personCreate', { title: 'Person' })
    },
    postCreatePerson: async (req, res, next) => {
        // const currentUser = await User.findOne({ _id: req.session.user._id })
        const newPerson = await Person.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }) // TODO: catch TODO: other fields
        const currentTree = await Tree.findOne({ id: req.body.tree }) // TODO: catch
        // TODO: does user have an access to tree?
        currentTree.persons.push(newPerson._id)
        await currentTree.save()
        return res.redirect('/user/profile') // FIXME: redirect to the current tree
    },
    postRemovePerson: async (req, res, next) => {
        await Person.deleteOne({ id: req.body.id }) // TODO: catch
        return res.redirect('/user/profile')
    },
    getPersonById: async (req, res, next) => {
        const person = await Person.findOne({ id: req.params.id }) // TODO: catch
        res.render('person', {
            title: 'Person',
            person
        })
    }
}

module.exports = personController
