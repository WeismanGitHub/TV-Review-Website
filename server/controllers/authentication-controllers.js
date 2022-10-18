const UserModel = require('../models/user-model')
const CustomErrors = require('../errors')

const register = async (req, res) => {
    const userAlreadyExists = await UserModel.exists({ name: req.body.name });

    if (userAlreadyExists) {
        throw new CustomErrors.BadRequestError('Username already exists.')
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
        throw new CustomErrors.BadRequestError('Please provide a valid name.')
    }
    
    const passwordIsCorrect = await user.checkPassword(password)
    
    if (!passwordIsCorrect) {
        throw new CustomErrors.BadRequestError('Please provide the correct password.')
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