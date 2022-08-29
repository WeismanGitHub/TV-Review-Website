const errorHandler = (err, req, res, next) => {
    console.log(err)

    res.status( err.statusCode || 500).send(String(err.message));
};

module.exports = errorHandler;