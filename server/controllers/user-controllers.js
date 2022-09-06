const DuplicateKeyError = require('../errors/duplicate-key-error')
const UnauthorizedError = require('../errors/unauthorized-error')
const UserModel = require('../models/user-model')

const updateUser = async (req, res) => {
    const { newName, newPassword, currentPassword} = req.body
    const user = await UserModel.findById(req.userId)
    
    const passwordIsCorrect = await user.checkPassword(currentPassword)
    
    if (!passwordIsCorrect) {
        throw new UnauthorizedError('Please provide the correct current password.')
    }

    if (newName) {
        user.name = newName
    }

    if (newPassword) {
        user.password = newPassword
    } else {
        user.password = currentPassword
    }

    await user.save()
    .catch(err => {
        if (err.name == 'MongoServerError') {
            throw new DuplicateKeyError('Pick a unique username.')
        }
        
        throw new Error(err.message)
    })

    res.status(200).end()
}

const deleteUser = async (req, res) => {
    await UserModel.deleteOne({ _id: req.userId })

    res.status(200)
    .clearCookie('token')
    .redirect('/authentication')
}

// getSelf and getUser are separate because getSelf requires you be logged in.
const getUser = async (req, res) => {
    const user = await UserModel.findById(req.params.userId).select('-password').lean()

    if (!user) throw new Error('User does not exist.')

    res.status(200)
    .send(user)
}

const getSelf = async (req, res) => {
   const user = await UserModel.findById(req.userId).select('-password').lean()

   if (!user) throw new Error('User does not exist.')

    res.status(200)
    .send(user)
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getSelf
}