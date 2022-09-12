const mongoose = require('mongoose')

const VoteSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Please provide the review type.'],
        enum: ['downvote', 'upvote']
    },
    reviewId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide the review id.']
    }
})

module.exports = mongoose.model('votes', VoteSchema)