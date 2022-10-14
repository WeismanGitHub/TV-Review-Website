class DefaultError extends Error {
    constructor(message) {
        super(message || 'Something went wrong!')
        this.statusCode = 500
    }
}

module.exports = DefaultError
