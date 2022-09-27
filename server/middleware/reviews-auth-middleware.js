const jwt = require('jsonwebtoken')

const reviewsAuthMiddleware = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        req.user = { id: null }
        return next()
    }
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = req.user = { id: payload._id }
        next()
    } catch (err) {
        console.log(err)
        res.status(401)
        .clearCookie('token')
        .redirect('/authentication')
    }
}

module.exports = reviewsAuthMiddleware