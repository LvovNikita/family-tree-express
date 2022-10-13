'use strict'

class AuthResult {
    constructor (error, user = false) {
        this.error = error // string or null
        this.user = user // user or false
    }
}

module.exports = AuthResult

// null, user = no error, valid credentials
// null, false = no error, invalid credentials
// err = error
