router.get('/',verify, async (req, res) => {
    const { _id } = req.user
    const user = await userComponent.findUser(_id)
    messageComponent.showUser(res,user)
})
router.put('/edit',verify, async (req, res) => {
    const { _id } = req.user
    const { userName, lastName, firstName, email, is2faEnable } = req.body;
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!firstName || !lastName || !userName || !email) {
        messageComponent.emptyField(res)
    }
    if (!email || !regex.test(email)) {
        messageComponent.invalidEmail(res)
    }
    const emailIsNotUnique =await userComponent.uniqueEmail(email)
    if (emailIsNotUnique) {
        messageComponent.notUniqueEmail(res)
    }
    const user=await userComponent.updateUser(firstName, lastName, userName, email,is2faEnable,_id)
    messageComponent.showUser(res,user)
})

module.exports = router
