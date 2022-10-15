const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { getNextKeyDef } = require('@testing-library/user-event/dist/keyboard/getNextKeyDef')
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
    },
    level: {
        type: String,
        required: [true, 'Please provide a level.'],
        default: 0,
        min: 0,
        max: 2
    },
    strikes: {
        type: Number,
        required: [true, 'Please provide the amount of strikes.'],
        default: 0,
        min: 0,
        max: 3
    }
}, { timestamps: { createdAt: true, updatedAt: false } })

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.pre('updateOne', async function(next) {
    if (this.strikes >= 3) {
        await this.delete()
    }
    
    next()
})

UserSchema.methods.createJWT = function() {
    return jwt.sign(
        { _id: this._id, level: this.level },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME },
    )
}

UserSchema.methods.checkPassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('users', UserSchema)