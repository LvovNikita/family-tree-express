'use strict'

const http = require('http')
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const swaggerUi = require('swagger-ui-express')

// ENVIRONMENT VARIABLES
const { HOST, PORT, NODE_ENV } = require('./config/env')

// APP
const app = express()
const server = http.createServer(app)
app.set('view engine', 'ejs')

// MIDDLEWARE
app.use(ejsLayouts)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(require('./config/swagger.json')))

const Logger = require('./config/Logger')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
if (NODE_ENV === 'development') {
    app.use(Logger('morgan'))
    app.use(Logger('body'))
    app.use(Logger('session'))
}

// ROUTES
app.use(require('./routes'))
app.use('/', require('./middleware/notFound')) // 404
app.use(require('./middleware/catchErrors')) // 500

// START SERVER

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})

process.on('uncaughtException', err => {
    console.log(err.message)
    process.exit(1)
})
