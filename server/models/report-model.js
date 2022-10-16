const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema({
    reason: {
        type: String,
        required: [true, 'Please provide a reason.'],
        minlength: 1,
        maxlength: 1000,
    },
    reviewId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide the review id.'],
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide a reporter id.']
    },
    status: {
        type: Boolean,
        required: [true, 'Please provide a status.'],
        default: false
    }
})

module.exports = mongoose.model('reports', ReportSchema)