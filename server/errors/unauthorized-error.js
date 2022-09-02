class UnauthorizedError extends Error {
    constructor(message) {
        super(message || 'Invalid Credentials')
        this.statusCode = 401
    }
}

module.exports = UnauthorizedError
