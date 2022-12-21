'use strict'

const { Router } = require('express')

const {
    getCreatePersonPage,
    postCreatePerson,
    getPersonPage,
    postRemovePerson
} = require('./personController')

const personRouter = new Router()

personRouter.route('/create')
    .get(getCreatePersonPage)
    .post(postCreatePerson)

personRouter
    .get('/:id', getPersonPage)

personRouter
    .post('/remove/:id', postRemovePerson)

module.exports = personRouter
