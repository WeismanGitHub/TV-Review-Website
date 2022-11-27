const ObjectId = require('mongoose').Types.ObjectId;
const UserModel = require('../models/user-model')

const {
    BadRequestError,
    UnauthorizedError,
    NotFoundError
} = require('../errors')

const updateUser = async (req, res) => {
    const { newName, newPassword, currentPassword} = req.body

    if (newName) {
        const userNameUnoriginal = await UserModel.exists({ name: newName });

        if (userNameUnoriginal) {
            throw new BadRequestError('Username already exists.')
        }
    }
    
    const user = await UserModel.findById(req.user.id)
    
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

    res.status(200)
    .cookie('token', user.createJWT())
    .end()
}

const deleteUser = async (req, res) => {
    await UserModel.deleteOne({ _id: req.user.id })

    res.status(200)
    .clearCookie('token')
    .redirect('/authentication')
}

// getSelf and getUser are separate because getSelf requires you be logged in.
const getUser = async (req, res) => {
    const userId = req.params.userId

    if (!ObjectId.isValid(userId)) {
        throw new BadRequestError('Id is invalid.')
    }

    const user = await UserModel.findById(userId).select('-password').lean()

    if (!user) throw new NotFoundError('User does not exist.')

    res.status(200)
    .send(user)
}

const getSelf = async (req, res) => {
   const user = await UserModel.findById(req.user.id).select('-password').lean()

   if (!user) throw new NotFoundError('User does not exist.')

    res.status(200)
    .send(user)
}

const getUserReviews = async (req, res) => {
    const sort = {
        score: req.query.score == 'high' ? -1 : 1,
        updatedAt: req.query.updatedAt == 'new' ? -1 : 1,
    }

    const reviews = (await ReviewModel.find({ userId: req.query.userId })
    .sort(sort).lean())
    .map(review => {
        review.editable = req.user.id == review.userId
        return review
    })

    res.status(200).json(reviews)
}

module.exports = {
    getUserReviews,
    updateUser,
    deleteUser,
    getUser,
    getSelf
}