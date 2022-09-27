const modAuthMiddleware = async (req, res, next) => {
    if (req.user.level == 'user') {
        return res.status(401).redirect('/authentication')
    }

    next()
}

module.exports = modAuthMiddleware