const UnauthenticatedError = require('./unauthenticated');
const NotFoundError = require('./not-found');
const UnauthorizedError = require('./unauthorized');
const BadRequestError = require('./bad-request');
const CustomError = require('./custom-error');

module.exports = {
    UnauthenticatedError,
    UnauthorizedError,
    BadRequestError,
    NotFoundError,
    CustomError,
};
