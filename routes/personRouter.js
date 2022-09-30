'use strict'

const { Router } = require('express')

const personController = require('../controllers/personController')

const personRouter = new Router()

personRouter.route('/create')
    .get(personController.getCreatePersonPage)
    .post(personController.postCreatePerson)

personRouter.post('/remove/:id', personController.postRemovePerson)

personRouter.get('/:id', personController.getPersonById)

module.exports = personRouter
