'use strict'

const { Router } = require('express')

// const wrapper = require('./wrapper.js')
const Person = require('../models/Person')
const Tree = require('../models/Tree')

const personRouter = new Router()

personRouter.get('/create', (req, res, next) => {
    res.render('person', { title: 'Person' })
})

personRouter.post('/create', async (req, res, next) => {
    console.log(req.query)
    const newPerson = await Person.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname 
    }) // TODO: catch TODO: other fields
    const currentTree = await Tree.findOne({}) // FIXME: get current tree TODO: catch
    currentTree.persons.push(newPerson._id)
    await currentTree.save()
    return res.redirect('/profile') // FIXME: redirect to the current tree
})

personRouter.get('/:id', (req, res, next) => {
    res.send(`Person ${req.params.id}`)
})

module.exports = personRouter
