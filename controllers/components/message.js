const fileUpload = (res) => {
    res.status(200).json({
        success: true,
        message: 'File uploaded successfully!'
    })
}
const deleteBlog = (res) => {
    res.status(200).json({
        message: 'blog deleted.'
    })
}
const showBlog = (res, blog) => {
    res.status(200).send(blog)
}
const emptyField = (res) => {
    console.log('user entry is not correct!');
    res.status(400).send('some fields are empty.');
    return;
}
const emptyEmailOrPassword = (res) => {
    console.log('email or password is empty!');
    res.status(400).send('email or password is empty!');
    return;
}
const invalidEmail = (res) => {
    res.status(400).send({
        message: "Please provide a valid email"
    });
    return;
}
const notUniqueEmail = (res) => {
    console.log('email exist!');
    res.status(400).send('email already existed');
    return;
}
const showUser = (res, user) => {
    res.status(200).send(user)
}
const userNotExist = (res) => {
    console.log('user not exist');
    res.status(400).send('user not exist');
    return;
}
const passwordMismatch = async (res) => {
    console.log('password or email mismatch.')
    res.status(400).send('password or email mismatch.');
    return;
}
const otpPasswordMismatch = async (res) => {
    console.log('password or email mismatch.')
    res.status(404).send('OTP password mismatched!')
    return;
}
const noAccess=(res)=>{
    res.status(404).send('access denied!')
}
const tokenError=(res,err)=>{
    res.status(403).send(err)
}
module.exports = {
    fileUpload,
    deleteBlog,
    showBlog,
    emptyField,
    invalidEmail,
    notUniqueEmail,
    showUser,
    emptyEmailOrPassword,
    userNotExist,
    passwordMismatch,
    otpPasswordMismatch,
    noAccess,
    tokenError
}