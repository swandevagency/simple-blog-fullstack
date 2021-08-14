const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const verify = require('../../middleware/auth')
const globalController = require('../../controllers/index')

router.get('/', verify, async (req, res) => {
  const blogs = await mongoose.model('Blog').find().sort({ createdAt: -1 })
  res.status(200).send(blogs)
})

router.get('/:id', verify, async (req, res) => {
  const _id = req.params.id
  const blog = await mongoose.model('Blog').findOne({ _id })
  res.status(200).send(blog)
})

router.post('/create', verify, (req, res) => {
  globalController.uploadComponent.uploadImage(req, res, async (error) => {
    if (error) { //instanceof multer.MulterError
      globalController.errorComponent.fileSize(error)
    } else {
      globalController.errorComponent.fileExist(req)
    }
    globalController.updateComponent.createBlog(req)
    globalController.messageComponent.fileUpload(res)
  })
})

router.put('/edit/:id', verify, async (req, res) => {
  const _id = req.params.id
  const blog = await mongoose.model('Blog').findOne({ _id })
  await globalController.uploadComponent.unlinkAsync(blog.blogImageURL)
  globalController.uploadComponent.uploadImage(req, res, async (error) => {
    if (error) { //instanceof multer.MulterError
      globalController.errorComponent.fileSize(error)
    } else {
      globalController.errorComponent.fileExist(req)
      globalController.updateComponent.updateBlog(req,_id)
      globalController.messageComponent.fileUpload(res)
    }
  })
})

router.delete('/:id', verify, async (req, res) => {
  const blog = await mongoose.model('Blog').findById(req.params.id)
  await globalController.uploadComponent.unlinkAsync(blog.blogImageURL)
  const _id = req.params.id
  await mongoose.model('Blog').deleteOne({ _id })
  globalController.messageComponent.deleteBlog(res)
})

module.exports = router;