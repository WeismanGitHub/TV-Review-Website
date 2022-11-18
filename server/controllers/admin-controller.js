const UserModel = require('../models/user-model')
const CustomErrors = require('../errors')

const changeLevel = async (req, res) => {
    const level = req.body.level
    
    if (!(0 <= level < 2)) {
        throw new CustomErrors.BadRequestError('Level can only be changed to 0 or 1.')
    }

    await UserModel.updateOne(
        { _id: req.body.userId },
        { level: level }
    )

    res.status(200).end()
}

module.exports = {
    changeLevel,
}