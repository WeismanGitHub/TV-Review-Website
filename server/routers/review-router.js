const express = require('express')
const {
    updateReview,
    createReview,
    deleteReview,
    getReview
} = require('../controllers/review-controllers')

const router = express.Router()

router.route('/').post(createReview)
router.route('/update/:reviewId').post(updateReview)
router.route('/delete/:reviewId').post(deleteReview)
router.route('/:reviewId').get(getReview)

module.exports = router