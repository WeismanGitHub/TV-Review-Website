const DuplicateKeyError = require('../errors/duplicate-key-error')
const UnauthorizedError = require('../errors/unauthorized-error')
const UserSchema = require('../schemas/user-schema')

const updateUser = async (req, res) => {
    const { name, newPassword, currentPassword} = req.body
    const user = await UserSchema.findById(req.userId)
    
    const passwordIsCorrect = await user.checkPassword(currentPassword)
    
    if (!passwordIsCorrect) {
        throw new UnauthorizedError('Please provide the correct password.')
    }
    
    user.name = name ?? user.name
    user.name = name ?? user.name
    user.password = newPassword ?? user.password
    console.log(user)

    // await user.save()
    // .catch(err => {
    //     if (err.name == 'MongoServerError') {
    //         throw new DuplicateKeyError('Pick a unique username.')
    //     }
        
    //     throw new Error(err.message)
    // })

    // const token = user.createJWT()

    // res.status(200)
    // .cookie('token', token)
    // .end()
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
    updateUser,
    deleteUser,
    getUser,
    getSelf
}