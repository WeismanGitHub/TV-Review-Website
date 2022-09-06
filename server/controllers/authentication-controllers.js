const DuplicateKeyError = require('../errors/duplicate-key-error')
const UnauthorizedError = require('../errors/unauthorized-error')
const UserModel = require('../models/user-model')

const register = async (req, res) => {
    console.log(req)
    const user = await UserModel.create(req.body)
    .catch(err => {
        if (err.name == 'MongoServerError') {
            throw new DuplicateKeyError('Pick a unique username.')
        }

        throw new Error(err.message)
    })

    const token = user.createJWT()

    res.status(201)
    .cookie('token', token)
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
    .redirect('/')
}

const logout = async (req, res) => {
    res.status(200)
    .clearCookie('token')
    .redirect('/authentication')
}

module.exports = { login, register, logout }