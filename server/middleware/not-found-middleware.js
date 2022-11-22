const { NotFoundError } = require('../errors')

const notFoundMiddleware = (req, res, next) => {
    throw new NotFoundError('Route not found.')
}

module.exports = notFoundMiddleware