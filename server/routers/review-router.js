const reviewsAuthMiddleware = require('../middleware/reviews-auth-middleware')
const authenticationMiddleware = require('../middleware/auth-middleware')
const { Router } = require('express')

const {
    updateReview,
    createReview,
    deleteReview,
    reportReview,
    getReviews,
    vote
} = require('../controllers/review-controller')

const router = Router()

router.route('/').post(authenticationMiddleware, createReview).patch(authenticationMiddleware, updateReview)
router.route('/vote').post(authenticationMiddleware, vote)
router.route('/report').post(authenticationMiddleware, reportReview)
router.route('/delete').post(authenticationMiddleware, deleteReview)
router.route('/:type/:id').get(reviewsAuthMiddleware, getReviews)

module.exports = router