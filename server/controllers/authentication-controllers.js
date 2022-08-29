const UnauthorizedError = require('../errors/unauthorized-error')
const UserSchema = require('../schemas/user-schema')

const register = async (req, res) => {
    const user = await UserSchema.create(req.body)
    const token = user.createJWT()

    res.status(201)
    .cookie('token', token)
    .redirect('/')
}

const login = async (req, res) => {
    const { name, password } = req.body
    const user = await UserSchema.findOne({ name: name })

    if (!user) {
        throw new UnauthorizedError('Please provide a valid name.')
    }
    
    const PasswordIsCorrect = await user.checkPassword(password)
    
    if (!PasswordIsCorrect) {
        throw new UnauthorizedError('Please provide the correct password.')
    }

    const token = user.createJWT()

    res.status(200)
    .cookie('token', token)
    .redirect('/')
}

const logout = async (req, res) => {
    res.status(200)
    .clearCookie('token')
    .redirect('/authentication')
}

module.exports = { login, register, logout }