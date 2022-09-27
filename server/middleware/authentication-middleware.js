const jwt = require('jsonwebtoken')

const authentication = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        throw new Error('Authentication Invalid')
    }
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { id: payload._id, level: payload.level }
        next()
    } catch (error) {
        res.status(401)
        .clearCookie('token')
        .redirect('/authentication')
    }
}

module.exports = authentication