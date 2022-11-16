'use strict'

const swaggerUi = require('swagger-ui-express')

function makeApp (session, router, logger, nodeEnv = 'development') {
    // DEPENDENCIES
    const express = require('express')
    const passport = require('passport')
    const ejsLayouts = require('express-ejs-layouts') // FIXME:

    // SERVER
    const app = express()

    // VIEW ENGINE
    app.set('view engine', 'ejs')
    app.use(ejsLayouts)

    // PARSERS
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())

    // SESSION
    app.use(session)

    // PASSPORT
    require('./config/passport')
    app.use(passport.initialize())
    app.use(passport.session())

    // LOGGER
    if (nodeEnv === 'development' && logger !== null) {
        app.use(logger)
    }


    // SWAGGER
    if (nodeEnv === 'development') {
        app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(require('./config/swagger.json')))
    }

    // ROUTER
    app.use(router)

    return app
}

module.exports = makeApp
