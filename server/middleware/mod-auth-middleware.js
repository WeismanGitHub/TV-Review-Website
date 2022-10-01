const modAuthMiddleware = async (req, res, next) => {
    if (req.user.level == 'user') {
        return res.status(401).send('Must be a mod.')
    }

    next()
}

module.exports = modAuthMiddleware