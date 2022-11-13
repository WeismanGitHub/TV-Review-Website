const VoteSchema = require('./vote-schema')
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
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide a creator id.'],
    },
    media: {
        type: {
            type: String,
            required: [true, 'Please provide a tv type. [movie, tv]'],
            enum: ['tv', 'movie']
        },
        id: {
            type: Number,
            required: [true, 'Please provide the tv id.'],
        },
    },
    votes: [{
        type: VoteSchema,
        max: 1000
    }],
    extraVotes: {
        type: Boolean,
        default: false
    }
}, { timestamps: { createdAt: false, updatedAt: true } })

ReviewSchema.plugin(schema => {
    schema.pre('findOneAndUpdate', setOptions);
    schema.pre('updateMany', setOptions);
    schema.pre('updateOne', setOptions);
    schema.pre('update', setOptions);
});

function setOptions() {
    this.setOptions({ runValidators: true });
}

ReviewSchema.index({ 'media.id': 1, type: 1 });

module.exports = mongoose.model('reviews', ReviewSchema)