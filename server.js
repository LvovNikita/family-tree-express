'use strict'

const path = require('node:path')

const express = require('express')
const passport = require('passport')
const ejsLayouts = require('express-ejs-layouts') // FIXME:
const swaggerUi = require('swagger-ui-express')
const flash = require('express-flash')

const addPassportLocals = require('./middleware/addPassportLocals')

function makeApp (session, router, viewEngine, logger, nodeEnv = 'development') {
    // SERVER
    const app = express()

    // VIEW ENGINE
    app.set('view engine', viewEngine)
    // FIXME:
    app.set('views', [
        path.join(__dirname, 'views'),
        path.join(__dirname, 'views', 'auth'),
        path.join(__dirname, 'views', 'user'),
        path.join(__dirname, 'views', 'person'),
        path.join(__dirname, 'views', 'tree')
    ])
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
    app.use(addPassportLocals)

    // FLASH
    app.use(flash())

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
