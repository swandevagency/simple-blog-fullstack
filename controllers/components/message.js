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

module.exports = {
    fileUpload,
    deleteBlog
}