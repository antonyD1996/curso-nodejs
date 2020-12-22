import express from 'express'
import blogController from '../controllers/blog.js'
import bodyParser from 'body-parser'
const blogRouter = express.Router()

blogRouter.use(bodyParser.urlencoded({ extended: true }))
blogRouter.get('/', blogController.renderBlog)
blogRouter.post('/new-post', blogController.newPost)
blogRouter.get('/new-post', blogController.renderNewPost)
blogRouter.get('/detail/:id', blogController.detail)
export default blogRouter