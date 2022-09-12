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
    tvId: {
        type: Number,
        required: [true, 'Please provide the tv id.']
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide a creator id.']
    },
    type: {
        type: String,
        required: [true, 'Please provide a tv type. [Movie, Show]'],
        enum: ['show', 'movie']
    }
})

module.exports = mongoose.model('reviews', ReviewSchema)