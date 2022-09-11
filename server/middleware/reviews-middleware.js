const jwt = require('jsonwebtoken')

const reviewMiddleware = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        req.userId = null
        return next()
    }
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = payload
        next()
    } catch (error) {
        res.status(401)
        .clearCookie('token')
        .redirect('/authentication')
    }
}

module.exports = reviewMiddleware