'use strict'

const mongoose = require('mongoose')

const { generatePassword, validatePassword } = require('../../utils/password')
const { ValidationError } = require('../../utils/errors')

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
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
        // TODO: validation
    },
    passwordHash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    passwordResetToken: {
        type: String
    },
    passwordResetTokenExpiration: {
        type: Date
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
    // used by passportjs verifyCb
    validatePassword: async function (password) {
        const isValid = await validatePassword(password, this.passwordHash, this.salt)
        return isValid
    }
})

// STATICS

Object.assign(userSchema.statics, {
    register: async (username, password, email) => {
        if (password.length < 8) {
            throw new ValidationError('Password must be at least 8 characters long')
        }
        const { hash, salt } = await generatePassword(password)
        const newUser = new User({ username, email, passwordHash: hash, salt })
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
