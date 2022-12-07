class ValidationError extends Error {
    constructor (message) {
        super(message)
        this.type = 'validation'
    }
}

module.exports = {
    ValidationError
}
