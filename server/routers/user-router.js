const authenticationMiddleware = require('../middleware/authentication-middleware')
const express = require('express')

const {
    updatePassword,
    updateName,
    deleteUser,
    getUser,
    getSelf
} = require('../controllers/user-controllers')

const router = express.Router()

router.route('/update/password').post(authenticationMiddleware, updatePassword)
router.route('/update/name').post(authenticationMiddleware, updateName)
router.route('/delete').post(authenticationMiddleware, deleteUser)
router.route('/').get(authenticationMiddleware, getSelf)
router.route('/:userId').get(getUser)

module.exports = router