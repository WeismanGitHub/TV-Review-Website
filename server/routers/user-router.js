const reviewsAuthMiddleware = require('../middleware/reviews-auth-middleware')
const authenticationMiddleware = require('../middleware/auth-middleware')
const { Router } = require('express')

const {
    getUserReviews,
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
router.route('/reviews/:userId').get(reviewsAuthMiddleware, getUserReviews)

module.exports = router