class ValidationError extends Error {
    constructor(message) {
        super(message || 'Validation Error')
        this.statusCode = 400
    }
}

module.exports = ValidationError
