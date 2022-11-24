const jwt = require('jsonwebtoken')

async function createJWT(user) {
    jwt.sign(
        { _id: user._id, level: user.level },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME },
    )
}

module.exports = createJWT