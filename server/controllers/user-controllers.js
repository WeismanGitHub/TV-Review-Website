const UserSchema = require('../schemas/user-schema')

const updateUser = async (req, res) => {
    const { name, password } = req.body
    //If a password or name is entered then it's added to updateObject.
    const updateObject = { ...password && { password: password }, ...name && { name: name } }

    const user = await UserSchema.findByIdAndUpdate(
        req.userId,
        updateObject
    ).select('_id')

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
    updateUser,
    deleteUser,
    getUser,
    getSelf
}