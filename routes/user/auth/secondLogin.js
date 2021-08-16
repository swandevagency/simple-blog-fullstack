const express = require('express')
const router = express.Router()
const globalController = require('../../../controllers/index')

router.post('/', async (req, res) => {
    if (!req.headers.authorization) return globalController.messageComponent.noAccess(res)
    const otpToken = globalController.userComponent.findOtpToken(req)
    if (!otpToken) return globalController.messageComponent.noAccess(res)
    try {
        const _id = await globalController.userComponent.otpTokenIsMatch(otpToken, req.user)
        const user = await globalController.userComponent.findUser(_id)
        if (!(user.otpPassword === req.body.otpPassword)) return globalController.messageComponent.otpPasswordMismatch(res)
        await globalController.userComponent.createMainToken(user, res)
    } catch (err) {
        globalController.messageComponent.tokenError(res, err)
    }
})

module.exports = router;

