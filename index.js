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

if (NODE_ENV === 'development') {
    app.use(new Logger('morgan'))
    app.use(new Logger('session'))
}
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false }))

// ROUTES
const mainRouter = require('./routes/mainRouter')
const authRouter = require('./routes/authRouter')
const notFound = require('./middleware/notFound')
const catchErrors = require('./middleware/catchErrors')

app.use('/', mainRouter)
app.use('/auth', authRouter)
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
