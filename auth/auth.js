const User = require('../models/User')

module.exports = {
    register (username, password) {
        const newUser = new User({
            username,
            password
        })
        return newUser.register()
    }
}
