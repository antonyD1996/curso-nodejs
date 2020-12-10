const express = require('express')
const controller = require('../controllers/home')
const homeRouter = express.Router()

homeRouter.get('/', controller.renderHome)
module.exports = homeRouter