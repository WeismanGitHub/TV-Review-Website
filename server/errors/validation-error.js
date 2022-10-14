class ValidationError extends Error {
    constructor(message) {
        super(message || 'Invalid Input')
        this.statusCode = 400
    }
}

module.exports = ValidationError
