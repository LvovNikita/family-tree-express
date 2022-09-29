const util = require('node:util')

const mongoose = require('mongoose')

module.exports = mongoose
    .connect('mongodb://localhost:27017/family-tree', {
        serverSelectionTimeoutMS: 1000
    })
    .then(() => {
        console.log('Connected to MongoDB')
        console.log('Models: ' + util.inspect(mongoose.models))
    })
    .catch((err) => {
        throw new Error(err.message)
    })
