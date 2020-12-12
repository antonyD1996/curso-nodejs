import express from 'express'
import contactController from '../controllers/contact.js'
const contactRouter = express.Router()

contactRouter.get('/', contactController.renderContact)
export default contactRouter