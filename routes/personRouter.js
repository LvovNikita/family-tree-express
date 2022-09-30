'use strict'

const url = require('node:url')
const querystring = require('node:querystring')

const { Router } = require('express')

// const wrapper = require('./wrapper.js')
const Person = require('../models/Person')
const Tree = require('../models/Tree')

const personRouter = new Router()

personRouter.get('/create', (req, res, next) => {
    res.render('person', { title: 'Person' })
})

personRouter.post('/create', async (req, res, next) => {
    const newPerson = await Person.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }) // TODO: catch TODO: other fields
    const urlObj = url.parse(req.url)
    const queryObj = querystring.parse(urlObj.query)
    console.log(queryObj)
    const currentTree = await Tree.findOne({ id: req.body.treeId }) // TODO: catch
    // TODO: does user have an access to tree?
    currentTree.persons.push(newPerson._id)
    await currentTree.save()
    return res.redirect('/profile') // FIXME: redirect to the current tree
})

personRouter.post('/remove/:id', async (req, res, next) => {
    console.log('REMOVE!')
    await Person.deleteOne({ id: req.body.id }) // TODO: catch
    return res.redirect('/profile')
})

personRouter.get('/:id', (req, res, next) => {
    res.send(`Person ${req.params.id}`)
})

module.exports = personRouter
