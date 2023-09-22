import multer from 'multer'
import express from 'express'

import validateInput from '../middleware/validateInput'
import { createUserSchema } from '../schema/users/users.schema'
import { loginExists, signUpExists } from '../middleware/exists'
import { authStorage, imageFileFilter } from '../util/multer.config'
import { loginHandler, logoutHandler, signUpHandler } from '../controllers/auth.controller'
import { loginSchema } from '../schema/auth/auth.schema'

const authRoute = express.Router()

authRoute.post(
  '/signup',
  [
    multer({ storage: authStorage, fileFilter: imageFileFilter }).single('avatar'),
    validateInput(createUserSchema),
    signUpExists,
  ],
  signUpHandler,
)
authRoute.post('/login', [validateInput(loginSchema), loginExists], loginHandler)
authRoute.post('/logout', logoutHandler)

export default authRoute
