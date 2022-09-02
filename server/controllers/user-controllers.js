const DuplicateKeyError = require('../errors/duplicate-key-error')
const UserSchema = require('../schemas/user-schema')

const updateName = async (req, res) => {
    const user = await UserSchema.findByIdAndUpdate(
        req.userId,
        { name: req.body }
    ).select('_id')

    const token = user.createJWT()

    res.status(200)
    .cookie('token', token)
    .end()
}

const updatePassword = async (req, res) => {
    const user = await UserSchema.findById(
        req.userId
    ).select('_id')

    user.password = req.body
    await user.save()
    .catch(err => {
        if (err.name == 'MongoServerError') {
            console.log('errere', err.message)
            throw new DuplicateKeyError('Pick a unique username.')
        }
        throw new Error(err.message)
    })

    const token = user.createJWT()

    res.status(200)
    .cookie('token', token)
    .end()
}

const deleteUser = async (req, res) => {
    await UserSchema.deleteOne({ _id: req.userId })

    res.status(200)
    .clearCookie('token')
    .redirect('/authentication')
}

const getUser = async (req, res) => {
    const user = await UserSchema.findById(req.params.userId).select('-_id -password').lean()

    if (!user) throw new Error('User does not exist.')

    res.status(200)
    .send(user)
}

const getSelf = async (req, res) => {
   const user = await UserSchema.findById(req.userId).select('-_id -password').lean()

   if (!user) throw new Error('User does not exist.')

    res.status(200)
    .send(user)
}

module.exports = {
    updatePassword,
    updateName,
    deleteUser,
    getUser,
    getSelf
}