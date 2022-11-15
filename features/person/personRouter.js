'use strict'

const { Router } = require('express')

const personController = require('./personController')
const tryCatchWrapper = require('../../utils/tryCatchWrapper')

const personRouter = new Router()

personRouter.route('/create')
    .get(tryCatchWrapper(personController.getCreatePersonPage))
    .post(tryCatchWrapper(personController.postCreatePerson))

personRouter.get('/:id', tryCatchWrapper(personController.getPersonById))
personRouter.post('/remove/:id', tryCatchWrapper(personController.postRemovePerson))

module.exports = personRouter
