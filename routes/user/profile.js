const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const verify = require('../../middleware/auth')

router.get('/',verify, async (req, res) => {
    const { _id } = req.user
    const user = await mongoose.model('User').findOne({ _id })
    res.status(200).send(user)
})
router.put('/edit',verify, async (req, res) => {
    const { _id } = req.user
    const { userName, lastName, firstName, email, is2faEnable } = req.body;
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!firstName || !lastName || !userName || !email) {
        console.log('user entry is not correct!');
        res.status(400).send('some fields are empty.');
        return;
    }
    if (!email || !regex.test(email)) {
        res.status(400).send({
            message: "Please provide a valid email"
        });
        return;
    }
    const emailIsNotUnique = await mongoose.model('User').findOne({ email })
    if (emailIsNotUnique) {
        console.log('email exist!');
        res.status(400).send('email already existed');
        return;
    }
    const user = await mongoose.model('User').updateOne({ _id }, {
        firstName,
        lastName,
        userName,
        email,
        is2faEnable
    });
    res.status(200).send(user);
})

module.exports = router
