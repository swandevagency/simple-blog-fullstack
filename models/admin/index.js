const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
})
module.exports = adminSchema
