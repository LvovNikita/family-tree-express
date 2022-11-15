'use strict'

module.exports = {
    PORT: 3000,
    HOST: '127.0.0.1',
    NODE_ENV: process.env.NODE_ENV || 'development',
    SESSION_SECRET: 'SECRET',
    MONGO_URL: 'mongodb://127.0.0.1:27017/family-tree'
}
