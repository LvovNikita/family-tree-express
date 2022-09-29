const mongoose = require('mongoose')
const moment = require('moment')

const latinAndCyrillicLetters = /[A-za-zА-Яа-я]*/

const personSchema = new mongoose.Schema({
    lastname: {
        type: String,
        trim: true,
        match: latinAndCyrillicLetters
    },
    lastnameAtBirth: {
        type: String,
        trim: true,
        match: latinAndCyrillicLetters
    },
    firstname: {
        type: String,
        trim: true,
        match: latinAndCyrillicLetters
    },
    middlename: {
        type: String,
        trim: true,
        match: latinAndCyrillicLetters
    },
    gender: {
        type: String,
        enum: ['M', 'F']
    },
    dob: Date,
    dod: Date,
    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    children: [mongoose.Schema.Types.ObjectId],
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

personSchema.virtual('age').get(function () {
    if (!this.dob) return 'unknown'
    if (!this.dod) return moment(new Date()).diff(this.dob.toISOString(), 'years')
    return moment(this.dod.toISOString()).diff(moment(this.dob.toISOString()), 'years')
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
