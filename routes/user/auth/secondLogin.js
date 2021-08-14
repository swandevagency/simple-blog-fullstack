const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const router = express.Router()

router.post('/', async (req, res) => {
    if (!req.headers.authorization) return res.status(404).send('access denied!')
    const otpToken = req.headers.authorization.split(" ")[1]
    if (!otpToken) return res.status(404).send('access denied!')
    try {
        const verified = jwt.verify(otpToken, process.env.OTP_SECRET)
        req.user = verified
        const { _id } = verified
        const user = await mongoose.model('User').findOne({ _id })
        if (!(user.otpPassword === req.body.otpPassword)) return res.status(404).send('OTP password mismatched!')
        const token = await jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.header('auth-token', token).send(token)
    } catch (err) {
        res.status(403).send(err)
    }
})

module.exports = router;

