const mongoose = require('mongoose')

const treeSchema = new mongoose.Schema({
    owner: mongoose.SchemaTypes.ObjectId,
    title: String,
    headOfTree: mongoose.SchemaTypes.ObjectId
})

const Person = mongoose.model('Tree', treeSchema)

module.exports = Person
