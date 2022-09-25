const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema({
    reason: {
        type: String,
        required: [true, 'Please provide a reason.'],
    },
    reviewId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide the review id.'],
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide a user id.']
    },
    resolved: {
        type: Boolean,
        required: [true, 'Is this report resolved?'],
        default: false
    }
})

module.exports = mongoose.model('reports', ReportSchema)