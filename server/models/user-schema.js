const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name.'],
        minlength: 1,
        maxlength: 15,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
        minlength: 6,
        maxlength: 50,
        trim: true,
    },
    score: {
        type: Number,
        required: [true, 'Please provide a score.'],
        default: 0
    }
})

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function() {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME },
    )
}

UserSchema.methods.checkPassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('users', UserSchema)