const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    is2faEnable: {
        type: Boolean,
        default: false
    },
    otpPassword: {
        type: String,
        default: "123456"
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
})
module.exports = userSchema;
