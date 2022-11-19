const CustomError = require('./custom-error');

class BadRequestError extends CustomError {
  constructor(message) {
    super(message || 'Not Found');
    this.statusCode = 404;
  }
}

module.exports = BadRequestError;
