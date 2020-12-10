const express = require('express')
const controller = require('../controllers/about')
const aboutRouter = express.Router()

aboutRouter.get('/', controller.renderAbout)
module.exports = aboutRouter