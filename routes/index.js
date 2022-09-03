const { Router } = require('express')

const router = new Router()

router.use('/', require('./mainRouter'))
router.use('/auth', require('./authRouter'))

module.exports = router
