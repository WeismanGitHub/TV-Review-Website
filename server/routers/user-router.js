const authenticationMiddleware = require('../middleware/authentication-middleware')
const express = require('express')

const {
    updateUser,
    deleteUser,
    getUser,
} = require('../controllers/user-controllers')

const router = express.Router()

router.route('/update').post(authenticationMiddleware, updateUser)
router.route('/delete').post(authenticationMiddleware, deleteUser)
router.route('/:userId?').get(getUser)

module.exports = router