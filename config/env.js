'use strict'

const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || '127.0.0.1',
    NODE_ENV: process.env.NODE_ENV || 'development',
    SESSION_SECRET: process.env.SESSION_SECRET || 'NYFnlb08DUd5er3CioIVWaDiOMzYaIMe',
    MONGO_URL: 'mongodb://127.0.0.1:27017/family-tree' || process.env.MONGO_URL
}
