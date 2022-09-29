'use strict'

const { Router } = require('express')

// const wrapper = require('./wrapper.js')

const personRouter = new Router()

personRouter.get('/create', (req, res, next) => {
    res.send('Create Person')
})

personRouter.get('/:id', (req, res, next) => {
    res.send(`Person ${req.params.id}`)
})

module.exports = personRouter
