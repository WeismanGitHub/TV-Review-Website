const UserModel = require('../models/user-model')
const jwt = require('jsonwebtoken')

const modAuthMiddleware = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        throw new Error('Please log in!')
    }
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = payload._id

        const user = await UserModel.findById(req.userId).select('-_id level').lean()

        if (user.level == 'user') {
            throw new Error('You are not a mod.')
        }

        next()
    } catch (error) {
        res.status(401)
        .clearCookie('token')
        .redirect('/authentication')
    }
}

module.exports = modAuthMiddleware