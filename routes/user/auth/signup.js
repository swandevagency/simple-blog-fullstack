const express = require('express')
const router = express.Router()
const globalController = require('../../../controllers/index')

router.post('/', async (req, res) => {
    const { firstName, lastName, userName, email, password,is2faEnable } = req.body;
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!firstName || !lastName || !userName || !password ) {
        globalController.messageComponent.emptyField(res)
    }
    if (!email || !regex.test(email)){
        globalController.messageComponent.invalidEmail(res)
    }
    const emailIsNotUnique =await globalController.userComponent.uniqueEmail(email)
    if (emailIsNotUnique) {
        globalController.messageComponent.notUniqueEmail(res)
    }
    const user =await globalController.userComponent.createUser(firstName, lastName, userName, email, password,is2faEnable)
    globalController.messageComponent.showUser(res,user)
})

module.exports = router