const mongoose = require('mongoose')

const treeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // required: true
    },
    title: {
        type: String,
        trim: true
        // required: true
    },
    headOfTree: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Person = mongoose.model('Tree', treeSchema)

module.exports = Person
