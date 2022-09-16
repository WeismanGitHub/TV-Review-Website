const errorHandler = (err, req, res, next) => {
    console.log(err)

    if (err.message == 'Request failed with status code 404') {
        return res.status(404).send('Not found!')
    }

    if (err.code == 'ENOTFOUND') {
        return res.status(500).send('Error getting results.')
    }

    res.status(err.statusCode || 500).send(String(err.message))
}

module.exports = errorHandler