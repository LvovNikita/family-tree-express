'use strict'

const { Router } = require('express')

const router = new Router()

router.use('/', require('./mainRouter'))
router.use('/auth', require('./authRouter'))
router.use('/tree', require('./treeRouter'))
router.use('/person', require('./personRouter'))
router.use('/user', require('./userRouter'))
router.use('/', require('../middleware/notFound')) // 404
router.use(require('../middleware/catchErrors')) // 500

module.exports = router
