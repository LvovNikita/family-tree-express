'use strict'

const http = require('http')
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')

// ENVIRONMENT VARIABLES
const { HOST, PORT, NODE_ENV } = require('./config/env')

// APP
const app = express()
app.set('view engine', 'ejs')
const server = http.createServer(app)

// MIDDLEWARE
const Logger = require('./config/Logger')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
if (NODE_ENV === 'development') {
    app.use(Logger('morgan'))
    app.use(Logger('body'))
    app.use(Logger('session'))
}
app.use(ejsLayouts)

// ROUTES
app.use(require('./routes'))

const notFound = require('./middleware/notFound')
const catchErrors = require('./middleware/catchErrors')
app.use('/', notFound)
app.use(catchErrors)

// START SERVER

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})

process.on('uncaughtException', err => {
    console.log(err.message)
    process.exit(1)
})
