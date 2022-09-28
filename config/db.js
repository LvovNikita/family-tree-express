const util = require('node:util')

const mongoose = require('mongoose')

require('../models/User')
require('../models/Person')
require('../models/Tree')

module.exports = mongoose
    .connect('mongodb://localhost:27017/family-tree')
    .then(() => {
        console.log('Connected to MongoDB')
        console.log('Models: ' + util.inspect(mongoose.models))
    })
