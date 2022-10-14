'use strict'

const mongoose = require('mongoose')

const { MIN_USER_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } = require('../config/env')
const AuthResult = require('./AuthResult')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [
            MIN_USERNAME_LENGTH,
            `Must be at least ${MIN_USERNAME_LENGTH} characters long`
        ],
        unique: true,
        trim: true,
        match: /\S*/
    },
    password: {
        type: String,
        minLength: [
            MIN_USER_PASSWORD_LENGTH,
            `Must be at least ${MIN_USER_PASSWORD_LENGTH} characters long`
        ],
        required: true,
        match: /\S*/,
        select: false
    },
    trees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tree' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
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

Object.assign(userSchema.methods, {})

// STATICS

Object.assign(userSchema.statics, {

    register: async (username, password) => {
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return new AuthResult('User already exists', existingUser)
        }
        const newUser = await User.create({ username, password })
        if (!newUser) {
            return new AuthResult('Creation or validation error', null)
        }
        return new AuthResult(null, newUser)
    },

    login: async function (username, password) {
        const result = await User
            .findOne({ username })
            .select('+password')
            .then(user => {
                if (!user) return new AuthResult('User doesn\'t exist', false)
                if (user.password !== password) return new AuthResult('Invalid Credentials', false)
                return new AuthResult(null, user)
            })
            .catch(err => {
                return new AuthResult(err.message, false)
            })
        return result
    }

})

// HOOKS

userSchema.pre('save', function (next) {
    // TODO: add password hashing
    this.updatedAt = new Date()
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
