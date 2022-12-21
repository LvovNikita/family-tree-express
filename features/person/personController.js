'use strict'

const Person = require('./Person')
// const Tree = require('../tree/Tree')
const User = require('../user/User')

const personController = {
    getCreatePersonPage: async (req, res, next) => {
        try {
            // FIXME: add passport.authenticate middleware!
            const currentUserId = req.session.passport?.user
            const currentUser = await User
                .findById(currentUserId)
                .populate('persons')
            return res.render('personCreate', {
                title: 'Create Person',
                persons: currentUser.persons
            })
        } catch (err) {
            return next(err)
        }
    },
    postCreatePerson: async (req, res, next) => {
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
        const newPersonObj = {
            lastname: req.body.lastname,
            lastnameAtBirth: req.body.lastnameAtBirth,
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            gender: req.body.gender,
            dob: req.body.dob,
            dod: req.body.dod,
            // FIXME:
            partner: req.body.partner,
            // FIXME
            children: req.body.children
        }
        const newPerson = await Person.create(newPersonObj)
        currentUser.persons.push(newPerson.id)
        await currentUser.save()
        return res.redirect('/user/profile')
    },
    postRemovePerson: async (req, res, next) => {
        // await Person.deleteOne({ id: req.body.id }) // TODO: catch
        // return res.redirect('/user/profile')
    },
    getPersonPage: async (req, res, next) => {
        // const person = await Person.findOne({ id: req.params.id }) // TODO: catch
        // res.render('person', {
        //     title: 'Person',
        //     person
        // })
    }
}

module.exports = personController
