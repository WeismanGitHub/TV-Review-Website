const UserModel = require('../models/user-model')
const { BadRequestError, UnauthorizedError } = require('../errors')

const register = async (req, res) => {
    const { name, password } = req.body
    
    if (!name) throw new BadRequestError('Name is undefined.')
    if (!password) throw new BadRequestError('Password is undefined.')

    if ((name.length >= 15) || (name.length <= 0)) throw new BadRequestError('Name must be between 0 and 15 characters.')
    if ((password.length >= 50) || (password.length <= 6)) throw new BadRequestError('Password must be between 6 and 50 characters.')

    const userAlreadyExists = await UserModel.exists({ name: name });

    if (userAlreadyExists) {
        throw new BadRequestError('Username already exists.')
    }

    const user = await UserModel.create(req.body)
    const token = user.createJWT()

    res.status(201)
    .cookie('token', token)
    .cookie('level', user.level)
    .end()
}

const login = async (req, res) => {
    const { name, password } = req.body
    const user = await UserModel.findOne({ name: name })

    if (!user) {
        throw new UnauthorizedError('Please provide a valid name.')
    }
    
    const passwordIsCorrect = await user.checkPassword(password)
    
    if (!passwordIsCorrect) {
        throw new UnauthorizedError('Please provide the correct password.')
    }

    const token = user.createJWT()

    res.status(200)
    .cookie('token', token)
    .cookie('level', user.level)
    .end()
}

const logout = async (req, res) => {
    res.status(200)
    .clearCookie('token')
    .clearCookie('level')
    .end()
}

module.exports = { login, register, logout }