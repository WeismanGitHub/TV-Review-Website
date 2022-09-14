const ReviewModel = require('./review-model')
const mongoose = require('mongoose')

const VoteSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Please provide the review type.'],
        enum: ['downvote', 'upvote']
    },
    reviewId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide the review id.'],
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide a user id.']
    }
})

VoteSchema.pre('updateOne', async function() {
    await ReviewModel.findByIdAndUpdate(
        this._update.reviewId,
        { $inc : {'score' : (this._update.type === 'upvote' ?  1 : -1) } }
    )
})

module.exports = mongoose.model('votes', VoteSchema)