const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const jwt=require('jsonwebtoken')

router.post('/', async (req, res) => {
    const { userName, password, phone } = req.body;
    console.log(phone);
    if (!userName || !password || !phone) {
        console.log('some fields are empty!');
        res.status(400).send('some fields are empty!');
        return;
    }
    const admin = await mongoose.model('Admin').findOne({ phone })
    console.log(admin);
    if (!admin) {
        console.log('user not exist');
        res.status(400).send('user not exist');
        return;
    }
    if (admin.password === password) {
        const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET)
        res.header('auth-token', token).send(token)
    } else {
        console.log('password or phone mismatch.')
        res.status(400).send('password or phone mismatch.');
        return;
    }
})
//x-
module.exports = router;
