'use strict'

const mongoose = require('mongoose')

const { generatePassword, validatePassword } = require('../../utils/password')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [
            2,
            'Must be at least 2 characters long'
        ],
        unique: true,
        trim: true,
        match: /\S*/
    },
    passwordHash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    trees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tree'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

// METHODS

Object.assign(userSchema.methods, {
    validatePassword: async function (password) {
        const isValid = await validatePassword(password, this.passwordHash, this.salt)
        return isValid
    }
})

// // STATICS

Object.assign(userSchema.statics, {
    register: async (username, password) => {
        const { hash, salt } = await generatePassword(password)
        const newUser = new User({ username, passwordHash: hash, salt })
        await newUser.save()
    }
})

// HOOKS

userSchema.pre('save', function (next) {
    this.updatedAt = new Date()
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
