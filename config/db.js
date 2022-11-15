// const util = require('node:util')

const mongoose = require('mongoose')

const connect = async () => {
    mongoose
        .connect('mongodb://localhost:27017/family-tree', {
            serverSelectionTimeoutMS: 1000
        })
        .then(connection => {
            // console.log(connection)
            console.log('Connected to MongoDB')
        })
        .catch((err) => {
            throw new Error(err.message)
        })
}

const database = {
    connect
}

module.exports = database
