const authenticationMiddleware = require('../middleware/auth-middleware')
const { Router } = require('express')

const {
    updateReview,
    createReview,
    deleteReview,
    getReviews,
    deleteVote,
    vote
} = require('../controllers/review-controllers')

const router = Router()

router.route('/')
.post(authenticationMiddleware, createReview)
.patch(authenticationMiddleware, updateReview)

// The delete method doesn't detect request bodies.
router.route('/delete').post(authenticationMiddleware, deleteReview)

router.route('/vote').post(authenticationMiddleware, vote)
.delete(authenticationMiddleware, deleteVote)

router.route('/:type/:id').get(getReviews)

module.exports = router