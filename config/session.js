const session = require('express-session')

const { SESSION_SECRET, MONGO_URL } = require('./env')

const MongoStore = require('connect-mongo')

module.exports = session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // true for production
        maxAge: 1000 * 60 * 60 * 24 * 30 // ms
    },
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        autoRemove: 'interval',
        autoRemoveInterval: 60 * 24 // minutes
    })
})
