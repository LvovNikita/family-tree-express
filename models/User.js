const mongoose = require('mongoose')

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
    password: {}
})

const User = mongoose.model('User', userSchema)

module.exports = User
