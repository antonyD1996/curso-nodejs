import express from 'express'
import contactController from '../controllers/contact.js'
import { parseBody } from '../middleware/middleware.js'
import bodyParser from 'body-parser'
const contactRouter = express.Router()

//el middleware permite procesar las peticiones
contactRouter.use(bodyParser.urlencoded({ extended: true }))
//contactRouter.use(parseBody)
contactRouter.post('/', contactController.contact)

export default contactRouter