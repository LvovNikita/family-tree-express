const mongoose = require('mongoose')

const AuthResult = require('./AuthResult')
const { MIN_USER_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } = require('../config/env')

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

Object.assign(userSchema.methods, {
    register: async function () {
        console.log('-----> INSIDE REGISTER METHOD!')
        const result = await User
            .findOne({ username: this.username })
            .then(user => {
                if (!user) {
                    this.save()
                    return new AuthResult(null, this)
                }
                return new AuthResult('User already exists', user)
            })
        return result
    },
    login: async function () {
        const result = await User
            .findOne({ username: this.username })
            .then(user => {
                if (!user) return new AuthResult('User doesn\'t exist', false)
                if (user.password !== this.password) return new AuthResult('Invalid Credentials', false)
                return new AuthResult(null, user)
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
