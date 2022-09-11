const authenticationMiddleware = require('../middleware/authentication-middleware')
const reviewsMiddleware = require('../middleware/reviews-middleware.js')
const express = require('express')

const {
    updateReview,
    createReview,
    deleteReview,
    getReviews
} = require('../controllers/review-controllers')

const router = express.Router()

router.route('/').post(authenticationMiddleware, createReview)
router.route('/update/:id').post(authenticationMiddleware, updateReview)
router.route('/delete/:id').post(authenticationMiddleware, deleteReview)
router.route('/:type/:id').get(reviewsMiddleware, getReviews)

module.exports = router