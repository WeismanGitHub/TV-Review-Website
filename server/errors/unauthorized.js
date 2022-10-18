const CustomError = require('./custom-error');

class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message || 'Unauthorized');
        this.statusCode = 403;
    }
}

module.exports = UnauthorizedError;
