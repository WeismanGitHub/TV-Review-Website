const ReviewModel = require('../models/review-model')
const VoteModel = require('../models/vote-model')

const createReview = async (req, res) => {
    await ReviewModel.create({
        body: req.body.body,
        userId: req.userId,
        tvId: req.body.tvId,
        type: req.body.type,
    })

    res.status(200).end()
}

const deleteReview= async (req, res) => {
    await ReviewModel.deleteOne({ _id: req.body.reviewId })

    res.status(200).end()
}

const getReviews = async (req, res) => {
    const reviews = (await ReviewModel.find({ type: req.params.type, tvId: req.params.id })
    .lean().select('-tvId -type'))
    .map(review => {
        review.editable = req.userId == review.userId
        return review
    })

    res.status(200).json(reviews)
}

const updateReview = async (req, res) => {
    await ReviewModel.updateOne(
        { _id: req.body.reviewId },
        { body: req.body.body }
    )

    res.status(200).end()
}

const vote = async (req, res) => {
    const vote = await VoteModel.findOne({ userId: req.userId, reviewId: req.body.reviewId })
    .select('-_id vote').lean()

    if (!vote) {
        await VoteModel.create({
            userId: req.userId,
            reviewId: req.body.reviewId,
            type: req.body.type
        })
    } else {
        await VoteModel.updateOne(
            { userId: req.userId, reviewId: req.body.reviewId },
            {
                userId: req.userId,
                reviewId: req.body.reviewId,
                type: req.body.type
            }
        )

        if (vote.type !== req.body.type) {
            await ReviewModel.updateOne(
                { _id: req.body.reviewId },
                 { $inc : { 'score' : req.body.type === 'upvote' ?  1 : -1 } }
             )
        }
    }

    res.status(200).end()
}

const deleteVote = async (req, res) => {
    await VoteModel.deleteOne({ userId: req.userId, reviewId: req.body.reviewId })

    res.status(200).end()
}

module.exports = {
    updateReview,
    createReview,
    deleteReview,
    getReviews,
    deleteVote,
    vote
}