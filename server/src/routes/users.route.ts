import multer from 'multer'
import express from 'express'

import { userExists } from '../middleware/exists'
import validateInput from '../middleware/validateInput'
import { updateUser, deleteUser } from '../middleware/isAuthorised'
import { imageFileFilter, userStorage } from '../util/multer.config'
import { deleteUserSchema, getUserSchema, updateUserSchema } from '../schema/users/users.schema'
import { createUserMessageSchema, getUserMessagesSchema } from '../schema/users/messages.schema'

import {
  httpGetAllUsers,
  httpGetUser,
  httpUpdateUser,
  httpDeleteUser,
  httpGetUserMessages,
  httpCreateMessage,
} from '../controllers/user.controller'

const userRoute = express.Router()

userRoute.get('/', httpGetAllUsers)
userRoute.get('/:userId', validateInput(getUserSchema), userExists, httpGetUser)

userRoute.patch(
  '/:userId',
  validateInput(updateUserSchema),
  userExists,
  multer({ storage: userStorage, fileFilter: imageFileFilter }).single('avatar'),
  updateUser,
  httpUpdateUser,
)
userRoute.delete(
  '/:userId',
  validateInput(deleteUserSchema),
  userExists,
  deleteUser,
  httpDeleteUser,
)

userRoute.get(
  '/:userId/messages',
  validateInput(getUserMessagesSchema),
  userExists,
  httpGetUserMessages,
)
userRoute.post(
  '/:userId/messages',
  validateInput(createUserMessageSchema),
  userExists,
  httpCreateMessage,
)

export default userRoute
