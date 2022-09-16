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

VoteSchema.pre('save', async function() {
    await ReviewModel.updateOne(
       { _id: this.reviewId },
        { $inc : {'score' : this.type === 'upvote' ?  1 : -1 } }
    )
})

VoteSchema.pre('deleteOne', async function() {
    await ReviewModel.updateOne(
        { _id: this.reviewId },
        { $inc: { 'score': this.type == 'upvote' ?  -1 : 1 } }
    )
})

module.exports = mongoose.model('votes', VoteSchema)