const mongoose = require('mongoose')

const { MONGO_URL } = require('./env')

const connect = async () => {
    try {
        await mongoose
            .connect(MONGO_URL, {
                serverSelectionTimeoutMS: 1000
            })
        console.log('Connected to MongoDB')
    } catch (err) {
        throw new Error(err.message)
    }
}

const database = {
    connect
}

module.exports = database
