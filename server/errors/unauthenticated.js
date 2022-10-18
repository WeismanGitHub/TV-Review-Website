const CustomError = require('./custom-error');

class UnauthenticatedError extends CustomError {
    constructor(message) {
        super(message || 'Unauthenticated');
        this.statusCode = 401;
    }
}

module.exports = UnauthenticatedError;
