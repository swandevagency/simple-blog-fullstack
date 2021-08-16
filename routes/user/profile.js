const express = require('express')
const router = express.Router()
const verify = require('../../middleware/auth')
const globalController = require('../../controllers/index')

router.get('/',verify, async (req, res) => {
    const { _id } = req.user
    const user = await globalController.userComponent.findUser(_id)
    globalController.messageComponent.showUser(res,user)
})
router.put('/edit',verify, async (req, res) => {
    const { _id } = req.user
    const { userName, lastName, firstName, email, is2faEnable } = req.body;
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!firstName || !lastName || !userName || !email) {
        globalController.messageComponent.emptyField(res)
    }
    if (!email || !regex.test(email)) {
        globalController.messageComponent.invalidEmail(res)
    }
    const emailIsNotUnique =await globalController.userComponent.uniqueEmail(email)
    if (emailIsNotUnique) {
        globalController.messageComponent.notUniqueEmail(res)
    }
    const user=await globalController.userComponent.updateUser(firstName, lastName, userName, email,is2faEnable,_id)
    globalController.messageComponent.showUser(res,user)
})

module.exports = router
