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
        match: /\S*/
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

Object.assign(userSchema.methods, {

})

// STATICS

Object.assign(userSchema.statics, {
    register: async (username, password) => {
        const result = await User
            .findOne({ username: this.username })
            .then(existingUser => {
                if (!existingUser) {
                    const newUser = User.create({
                        username,
                        password
                    })
                    return new AuthResult(null, newUser)
                }
                return new AuthResult('User already exists', existingUser)
            })
        return result
    },
    login: async function (username, password) {
        const result = await User
            .findOne({ username })
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

// TODO: move callback to utils
userSchema.pre('save', function (next) {
    this.updatedAt = new Date()
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
