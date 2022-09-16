const errorHandler = (err, req, res, next) => {
    if (err.message == 'Request failed with status code 404') {
        console.log(err)
        return res.status(404).send('Not found!')
    }
    
    if (err.code == 'ENOTFOUND') {
        console.log(err.message)
        return res.status(500).send('Error getting results.')
    }
    
    console.log(err)
    res.status(err.statusCode || 500).send(String(err.message))
}

module.exports = errorHandler