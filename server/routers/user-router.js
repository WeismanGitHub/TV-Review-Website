const authenticationMiddleware = require('../middleware/authentication-middleware')
const { Router } = require('express')

const {
    updateUser,
    deleteUser,
    getUser,
    getSelf
} = require('../controllers/user-controllers')

const router = Router()

router.route('/')
.get(authenticationMiddleware, getSelf)
.delete(authenticationMiddleware, deleteUser)
.patch(authenticationMiddleware, updateUser)

router.route('/:userId').get(getUser)

module.exports = router