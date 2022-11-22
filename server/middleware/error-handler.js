const { InternalError } = require('../errors')

const errorHandler = (err, req, res, next) => {
    if (process.env.PRINT_ERRORS == 'true') { // Won't work without the '== true' part
        console.error(err.message)
    }
    
    res.status(err.statusCode || 500).send(err.message)
}

module.exports = errorHandler