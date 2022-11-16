'use strict'

const makeApp = require('./server')
const session = require('./config/session')
const database = require('./config/db')
const router = require('./router')
const logger = require('./config/logger')

const { HOST, PORT } = require('./config/env')

const app = makeApp(session, router, logger);

(async () => {
    // CONNECT TO DB
    await database.connect()

    // SERVER LISTEN
    app.listen(PORT, HOST, () => {
        console.log(`Server is running on http://${HOST}:${PORT}`) // FIXME:
    })

    app.listen()

    // UNCAUGHT EXCEPTIONS
    process.on('uncaughtException', err => {
        console.log(err.message)
        process.exit(1)
    })
})()
