const express = require('express')
const controller = require('../controllers/blog')
const blogRouter = express.Router()

blogRouter.get('/', controller.renderBlog)
module.exports = blogRouter