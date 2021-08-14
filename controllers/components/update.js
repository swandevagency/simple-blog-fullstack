const mongoose = require('mongoose')
const Blog = mongoose.model('Blog')

const updateBlog = async (req,_id) => {
    await mongoose.model('Blog').updateOne({ _id }, /*{ upsert: false },*/
        {
            blogImageOriginalName: req.file.originalname,
            blogImageName: req.file.filename,
            blogImageURL: req.file.path,
            blogTitle: req.body.title,
            blogDescription: req.body.description,
            updatedAt: Date.now()
        }
    );
}
const createBlog = async (req) => {
    const blog = new Blog({
        blogImageOriginalName: req.file.originalname,
        blogImageName: req.file.filename,
        blogImageURL: req.file.path,
        blogTitle: req.body.title,
        blogDescription: req.body.description,
        userId: req.user._id
    })
    blog.save()
}

module.exports = {
    updateBlog,
    createBlog
}