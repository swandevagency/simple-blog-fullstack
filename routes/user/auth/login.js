const express = require('express')
const router = express.Router()
const globalController = require('../../../controllers/index')

router.put('/', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        globalController.messageComponent.emptyEmailOrPassword(res)
    }
    const user = await globalController.userComponent.findEmail(email)
    if (!user) {
        globalController.messageComponent.userNotExist(res)
    }
    const doMatch = await globalController.userComponent.passwordCheck(password,user.password)
    if (!doMatch) {
        globalController.messageComponent.passwordMismatch(res)
    }
    if (!user.is2faEnable) {
        await globalController.userComponent.createMainToken(user,res)
    } else {
        //2fa step
        await globalController.userComponent.createOtpToken(user,res)
    }
})

module.exports = router;

