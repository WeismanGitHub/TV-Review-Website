const ReviewModel = require('../models/review-model')
const ReportModel = require('../models/report-model')
const VoteModel = require('../models/vote-model')
const CustomErrors = require('../errors')

const createReview = async (req, res) => {
    await ReviewModel.create({
        body: req.body.body,
        userId: req.user.id,
        tvId: req.body.tvId,
        type: req.body.type,
    })

    res.status(200).end()
}

const deleteReview= async (req, res) => {
    await ReviewModel.deleteOne({ _id: req.body.reviewId, userId: req.user.id })

    res.status(200).end()
}

const getReviews = async (req, res) => {
    const sort = {
        score: req.query.score == 'high' ? -1 : 1,
        updatedAt: req.query.updatedAt == 'new' ? -1 : 1,
    }

    const reviews = (await ReviewModel.find({ type: req.params.type, tvId: req.params.id })
    .sort(sort).select('-tvId -type').lean())
    .map(review => {
        review.editable = req.user.id == review.userId
        return review
    })

    res.status(200).json(reviews)
}

const updateReview = async (req, res) => {
    if (1 <= req.body.body.length <= 1000) {
        throw new CustomErrors.BadRequestError('Body must be between 1 and 1000 characters.')
    }

    await ReviewModel.updateOne(
        { _id: req.body.reviewId, userId: req.user.id },
        { body: req.body.body }
    )

    res.status(200).end()
}

const vote = async (req, res) => {
    const vote = await VoteModel.findOne({ userId: req.user.id, reviewId: req.body.reviewId })
    .select('-_id type').lean()

    if (!vote) {
        await VoteModel.create({
            userId: req.user.id,
            reviewId: req.body.reviewId,
            type: req.body.type
        })
    } else {
        await VoteModel.updateOne(
            { userId: req.user.id, reviewId: req.body.reviewId },
            {
                userId: req.user.id,
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
    await VoteModel.deleteOne({ userId: req.user.id, reviewId: req.body.reviewId })

    res.status(200).end()
}

const reportReview = async (req, res) => {
    await ReportModel.create({
        reason: req.body.reason,
        reviewId: req.body.reviewId,
        userId: req.user.id
    })

    res.status(200).end()
}

module.exports = {
    reportReview,
    updateReview,
    createReview,
    deleteReview,
    getReviews,
    deleteVote,
    vote,
}