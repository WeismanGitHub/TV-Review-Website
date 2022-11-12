const VoteSchema = require('./vote-schema')
const mongoose = require('mongoose')

const ExtraVotes = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Provide the review id.'],
    },
    votes: [VoteSchema]
})

module.exports = mongoose.model('extra_votes', ExtraVotes)