const express = require('express')
const controller = require('../controllers/contact')
const contactRouter = express.Router()

contactRouter.get('/', controller.renderContact)
module.exports = contactRouter