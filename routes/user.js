import express, { Router } from 'express';
import userController from '../controllers/user.js'

const userRouter = express.Router();

userRouter.get('/:id', userController.getUser)
userRouter.put('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)

export default userRouter