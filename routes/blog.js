import express from 'express'
import blogController from '../controllers/blog.js'
const blogRouter = express.Router()

blogRouter.get('/', blogController.renderBlog)
export default blogRouter