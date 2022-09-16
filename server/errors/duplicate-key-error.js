class DuplicateKeyError extends Error {
    constructor(message) {
        super(message || 'Must Be Unique')
        this.statusCode = 400
    }
}

module.exports = DuplicateKeyError