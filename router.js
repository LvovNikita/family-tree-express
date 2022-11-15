'use strict'

const { Router } = require('express')
const getIndexPage = require('./middleware/getIndexPage')

const router = new Router()

router.get('/', getIndexPage)

router.use('/auth', require('./features/auth/authRouter'))
// router.use('/tree', require('./features/tree/treeRouter'))
// router.use('/person', require('./features/person/personRouter'))
// router.use('/user', require('./features/user/userRouter'))

router.use('/', require('./middleware/404')) // 404
router.use(require('./middleware/500')) // 500

module.exports = router
