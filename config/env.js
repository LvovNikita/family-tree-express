'use strict'

module.exports = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || '127.0.0.1',
    NODE_ENV: process.env.NODE_ENV || 'development',
    MIN_USER_PASSWORD_LENGTH: 8,
    MIN_USERNAME_LENGTH: 2,
    SESSION_SECRET: 'SECRET',
    MONGO_URL: 'mongodb://127.0.0.1:27017/family-tree'
}
