import express, { Router } from 'express'
import authController from '../controllers/auth.js'
import bodyParser from 'body-parser'
const authRouter = express.Router()

authRouter.use(bodyParser.urlencoded({ extended: true }))

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.get('/verify/', authController.verifyEmail)


export default authRouter