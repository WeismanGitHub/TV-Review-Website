const authenticationMiddleware = require('../middleware/authentication-middleware')
const express = require('express')

const {
    updateUser,
    deleteUser,
    getUser,
    getSelf
} = require('../controllers/user-controllers')

const router = express.Router()

router.route('/update').post(authenticationMiddleware, updateUser)
router.route('/delete').post(authenticationMiddleware, deleteUser)
router.route('/').get(authenticationMiddleware, getSelf)
router.route('/:userId').get(getUser)

module.exports = router