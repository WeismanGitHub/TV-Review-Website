const ReviewModel = require('../models/review-model')

const createReview = async (req, res) => {
}

const deleteReview= async (req, res) => {
}

const getReviews = async (req, res) => {
    const reviews = await ReviewModel.find({ type: req.params.type, tvId: req.params.id }).lean()

    res.status(200).json(reviews)
}

const updateReview = async (req, res) => {
}

module.exports = {
    updateReview,
    createReview,
    deleteReview,
    getReviews,
}