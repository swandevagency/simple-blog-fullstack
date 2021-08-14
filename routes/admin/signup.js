const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

router.post('/', async (req, res) => {
    const { userName, phone, password } = req.body;
    if (!phone || !userName || !password ) {
        console.log('user entry is not correct!');
        res.status(400).send('some fields are empty.');
        return;
    }
    const Admin = await mongoose.model('Admin');
    const admin = new Admin({
        password,
        userName,
        phone
    })
    await admin.save()
    res.send(admin)
})

module.exports = router