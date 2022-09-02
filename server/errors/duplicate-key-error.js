class DuplicateKeyError extends Error {
    constructor(message) {
        super(message || 'Pick something unique.')
        this.statusCode = 400
    }
}

module.exports = DuplicateKeyError