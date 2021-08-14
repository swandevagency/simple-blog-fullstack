const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

router.get('/', async (req, res) => {
    const users = await mongoose.model('User').find()
    res.status(200).send(users)
})

router.get('/:id', async (req, res) => {
    const user = await mongoose.model('User').findById(req.params.id)
    res.status(200).send(user)
})

router.put('/:id', async (req, res) => {
    const _id = req.params.id;
    const { userName, lastName, firstName, email } = req.body;
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    const user = await mongoose.model('User').updateOne({ _id }, {
        firstName,
        lastName,
        userName,
        email,
        isSecondAuth,
        isBlocked //if not mention here ,in creation all values are false,even we change it 
    });
    res.status(200).send(user);
})

router.delete('/:id', async (req, res) => {
    const user = await mongoose.model('User').deleteOne({ _id: req.params.id });
    res.status(200).send(user)
})

module.exports = router