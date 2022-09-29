'use strict'

const { Router } = require('express')

const router = new Router()

router.use('/', require('./mainRouter'))
router.use('/auth', require('./authRouter'))
router.use('/tree', require('./treeRouter'))
router.use('/person', require('./personRouter'))

module.exports = router
