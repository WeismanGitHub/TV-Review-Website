const UnauthenticatedError = require('./unauthenticated');
const BadRequestError = require('./bad-request');
const UnauthorizedError = require('./unauthorized');
const CustomError = require('./custom-error');

module.exports = {
    UnauthenticatedError,
    UnauthorizedError,
    BadRequestError,
    CustomError,
};
