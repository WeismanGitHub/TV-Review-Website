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

router.route('/')
.post(authenticationMiddleware, createReview)
.patch(authenticationMiddleware, updateReview)
.delete(authenticationMiddleware, deleteReview)

router.route('/vote').post(authenticationMiddleware, vote)
router.route('/:type/:id').get(reviewsMiddleware, getReviews)
g
module.exports = router