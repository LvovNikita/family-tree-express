const { randomBytes, scrypt } = require('crypto')

function generatePassword (password) {
    const salt = randomBytes(16).toString('hex')

    return new Promise((resolve, reject) => {
        scrypt(password, salt, 64, { N: 1024 }, (err, derivedKey) => {
            if (err) {
                return reject(new Error('Scrypt hash generation error'))
            }
            return resolve({
                hash: derivedKey.toString('hex'),
                salt
            })
        })
    })
}

function validatePassword (password, hashFromDb, saltFromDb) {
    return new Promise((resolve, reject) => {
        scrypt(password, saltFromDb, 64, { N: 1024 }, (err, hash) => {
            if (err) {
                return reject(new Error('Password validation error'))
            }
            resolve(hash === hashFromDb)
        })
    })
}

module.exports = {
    generatePassword,
    validatePassword
}
