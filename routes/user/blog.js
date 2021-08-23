router.get('/', verify, async (req, res) => {
  const blogs = await blogComponent.listBlog()
  messageComponent.showBlog(res,blogs)
})

router.get('/:id', verify, async (req, res) => {
  const _id = req.params.id
  const blog = await blogComponent.findBlog(_id)
  messageComponent.showBlog(res,blog)
})

router.post('/create', verify, (req, res) => {
  fileComponent.uploadImage(req, res, async (error) => {
    if (error) { //instanceof multer.MulterError
      errorComponent.fileSize(error)
    } else {
      errorComponent.fileExist(req)
    }
    blogComponent.createBlog(req)
    messageComponent.fileUpload(res)
  })
})

router.put('/edit/:id', verify, async (req, res) => {
  const _id = req.params.id
  const blog = await blogComponent.findBlog(_id)
  fileComponent.unlinkAsync(blog.blogImageURL)
  fileComponent.uploadImage(req, res, async (error) => {
    if (error) { //instanceof multer.MulterError
      errorComponent.fileSize(error)
    } else {
      errorComponent.fileExist(req)
      blogComponent.updateBlog(req,_id)
      messageComponent.fileUpload(res)
    }
  })
})

router.delete('/:id', verify, async (req, res) => {
  const _id = req.params.id
  const blog = await blogComponent.findBlog(_id)
  fileComponent.unlinkAsync(blog.blogImageURL)
  blogComponent.deleteBlog(_id)
  messageComponent.deleteBlog(res)
})

module.exports = router;