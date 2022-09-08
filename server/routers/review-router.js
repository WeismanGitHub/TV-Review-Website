const express = require('express')
const {
    updateReview,
    createReview,
    deleteReview,
    getReviews
} = require('../controllers/review-controllers')

const router = express.Router()

router.route('/').post(createReview)
router.route('/update/:id').post(updateReview)
router.route('/delete/:id').post(deleteReview)
router.route('/:type/:id').get(getReviews)

module.exports = router