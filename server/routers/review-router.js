const authenticationMiddleware = require('../middleware/authentication-middleware')
const reviewsMiddleware = require('../middleware/reviews-middleware.js')
const express = require('express')

const {
    updateReview,
    createReview,
    deleteReview,
    getReviews,
    vote
} = require('../controllers/review-controllers')

const router = express.Router()

router.route('/').post(authenticationMiddleware, createReview)
router.route('/vote/:id').post(authenticationMiddleware, vote)
router.route('/:type/:id').get(reviewsMiddleware, getReviews)

router.route('/:id')
.patch(authenticationMiddleware, updateReview)
.delete(authenticationMiddleware, deleteReview)

module.exports = router