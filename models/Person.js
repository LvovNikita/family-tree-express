const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    lastname: String,
    lastnameAtBirth: String,
    firstname: String,
    middlename: String,
    gender: {
        type: String
        // enum
    },
    dob: Date,
    partner: mongoose.SchemaTypes.ObjectId,
    children: [mongoose.SchemaTypes.ObjectId]
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
