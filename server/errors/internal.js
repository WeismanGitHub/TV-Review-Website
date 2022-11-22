const CustomError = require('./custom-error');

class InternalError extends CustomError {
    constructor(message) {
        super(message || 'Internal Error');
        this.statusCode = 500;
    }
}

module.exports = InternalError;
