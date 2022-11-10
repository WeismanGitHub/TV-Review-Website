const mongoose = require('mongoose')

const ExtraVotes = new mongoose.Schema({
    reviewId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide the review id.'],
    },
    votes: {
        type: {
            type: String,
            required: [true, 'Please provide the review type.'],
            enum: ['downvote', 'upvote'],
        },
        userId: {
            type: mongoose.Types.ObjectId,
            required: [true, 'Please provide a user id.'],
        }
    }
})

module.exports = mongoose.model('extra_votes', ExtraVotes)