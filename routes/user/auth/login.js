const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

router.put('/', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log('email or password is empty!');
        res.status(400).send('email or password is empty!');
        return;
    }
    const user = await mongoose.model('User').findOne({ email })
    if (!user) {
        console.log('user not exist');
        res.status(400).send('user not exist');
        return;
    }
    const doMatch = await bcrypt.compare(password, user.password)
    if (!doMatch) {
        console.log('password or email mismatch.')
        res.status(400).send('password or email mismatch.');
        return;
    }
    if (!user.is2faEnable) {
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{expiresIn:'7d'})
        res.header('auth-token', token).send(token)
    } else {
        //2fa step
        const newOtpPassword = Math.floor(100000 + Math.random() * 900000)
        user.otpPassword = newOtpPassword
        await user.save()
        console.log(newOtpPassword);
        const otpToken = await jwt.sign({ _id: user._id , newOtpPassword }, process.env.OTP_SECRET,{expiresIn: "120s"})
        res.header('auth-token', otpToken).send(otpToken)
    }
})

module.exports = router;

