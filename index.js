'use strict'

const express = require('express')
const ejsLayouts = require('express-ejs-layouts')

// ENVIRONMENT VARIABLES
const { HOST, PORT, NODE_ENV } = require('./config/env')

// APP
const app = express()
app.set('view engine', 'ejs')

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

app.use('/', mainRouter)
app.use('/auth', authRouter)
app.use('/', (req, res, next) => {
    res
        .status(404)
        .end('404')
})
app.use((err, req, res, next) => {
    console.error(err.message)
    process.exit(1)
})

// START SERVER
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})
