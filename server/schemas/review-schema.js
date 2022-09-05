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
    mediaName: {
        type: String,
        required: [true, 'Please provide the media name.']
    }
})

module.exports = mongoose.model('reviews', ReviewSchema)