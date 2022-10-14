const DuplicateKeyError = require('../errors/duplicate-key-error')
const UnauthorizedError = require('../errors/unauthorized-error')
const ValidationError = require('../errors/validation-error')
const DefaultError = require('../errors/default-error')
const UserModel = require('../models/user-model')

const register = async (req, res) => {
    const user = await UserModel.create(req.body)
    .catch(err => {
        if (err.name == 'MongoServerError') {
            throw new DuplicateKeyError('Pick a unique username.')
        } else if (err.name == 'ValidationError') {
            throw new ValidationError(err.message)
        }

        throw new DefaultError()
    })

    const token = user.createJWT()

    res.status(201)
    .cookie('token', token)
    .cookie('level', user.level)
    .redirect('/')
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
    .redirect('/')
}

const logout = async (req, res) => {
    res.status(200)
    .clearCookie('token')
    .clearCookie('level')
    .redirect('/authentication')
}

module.exports = { login, register, logout }