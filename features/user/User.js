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
        // minLength: [
        //     MIN_USER_PASSWORD_LENGTH,
        //     `Must be at least ${MIN_USER_PASSWORD_LENGTH} characters long`
        // ],
        // match: /\S*/,
        // select: false
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

//     login: async function (username, password) {
//         const result = await User
//             .findOne({ username })
//             .select('+password')
//             .then(user => {
//                 if (!user) return new AuthResult('User doesn\'t exist', false)
//                 if (user.password !== password) return new AuthResult('Invalid Credentials', false)
//                 return new AuthResult(null, user)
//             })
//             .catch(err => {
//                 return new AuthResult(err.message, false)
//             })
//         return result
//     }



// // HOOKS

userSchema.pre('save', function (next) {
    this.updatedAt = new Date()
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
