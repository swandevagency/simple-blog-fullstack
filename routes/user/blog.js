const express = require('express')
const router = express.Router()
const verify = require('../../middleware/auth')
const globalController = require('../../controllers/index')

router.get('/', verify, async (req, res) => {
  const blogs = globalController.blogComponent.listBlog()
  globalController.messageComponent.showBlog(res,blogs)
})

router.get('/:id', verify, async (req, res) => {
  const _id = req.params.id
  const blog = globalController.blogComponent.findBlog(_id)
  globalController.messageComponent.showBlog(res,blog)
})

router.post('/create', verify, (req, res) => {
  globalController.fileComponent.uploadImage(req, res, async (error) => {
    if (error) { //instanceof multer.MulterError
      globalController.errorComponent.fileSize(error)
    } else {
      globalController.errorComponent.fileExist(req)
    }
    globalController.blogComponent.createBlog(req)
    globalController.messageComponent.fileUpload(res)
  })
})

router.put('/edit/:id', verify, async (req, res) => {
  const _id = req.params.id
  const blog = globalController.blogComponent.findBlog(_id)
  globalController.fileComponent.unlinkAsync(blog.blogImageURL)
  globalController.fileComponent.uploadImage(req, res, async (error) => {
    if (error) { //instanceof multer.MulterError
      globalController.errorComponent.fileSize(error)
    } else {
      globalController.errorComponent.fileExist(req)
      globalController.blogComponent.updateBlog(req,_id)
      globalController.messageComponent.fileUpload(res)
    }
  })
})

router.delete('/:id', verify, async (req, res) => {
  const _id = req.params.id
  const blog = globalController.blogComponent.findBlog(_id)
  globalController.fileComponent.unlinkAsync(blog.blogImageURL)
  globalController.blogComponent.deleteBlog(_id)
  globalController.messageComponent.deleteBlog(res)
})

module.exports = router;