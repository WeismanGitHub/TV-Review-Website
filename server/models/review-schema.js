const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: [true, 'Please provide a score.'],
        default: 0
    },
    body: {
        type: String,
        required: [true, 'Please provide a body'],
        minlength: 1,
        maxlength: 1000,
    },
    mediaId: {
        type: Number,
        required: [true, 'Please provide the media id.']
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide a creator id.']
    }
})

module.exports = mongoose.model('reviews', ReviewSchema)