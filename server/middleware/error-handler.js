const errorHandler = (err, req, res, next) => {
    if (process.env.PRINT_ERRORS == 'true') { // Won't work without the '== true' part
        console.error(err.message)
    }

    if (err.message == 'Request failed with status code 404') {
        return res.status(404).send('Not found!')
    }
    
    if (err.code == 'ENOTFOUND') {
        return res.status(500).send('Error getting results.')
    }
    
    res.status(err.statusCode || 500).send(err.message)
}

module.exports = errorHandler