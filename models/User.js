const mongoose = require('mongoose')

const AuthResult = require('./AuthResult')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [2, 'Must be at least two characters long'],
        maxLength: [20, 'Must be shorter than 20 characters long'],
        unique: true,
        trim: true
        // get
        // set
        // immutable
        // transform
    },
    password: {},
    trees: [mongoose.SchemaTypes.ObjectId]
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

const User = mongoose.model('User', userSchema)

module.exports = User
