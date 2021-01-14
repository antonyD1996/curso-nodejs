import express from 'express'
import blogController from '../controllers/blog.js'

const blogRouter = express.Router()

blogRouter.get('/', blogController.list)
blogRouter.post('/', blogController.newPost)
blogRouter.get('/:id', blogController.detail)
blogRouter.put('/:id', blogController.updatePost)

export default blogRouter