import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

import { signJWT } from '../util/jwt'
import { Auth, User } from '../models/dto/dto'
import { LoginInput } from '../schema/auth/auth.schema'
import { CreateUserInput } from '../schema/users/users.schema'
import { decryptPassword, encryptPassword } from '../util/password'
import { createAuth } from '../services/auth/auth.service'
import { createUser, getUser } from '../services/users/users.service'
import { deleteFolder } from '../util/deleteFromStorage'

async function signUpHandler(
  req: Request<CreateUserInput['body']>,
  res: Response,
  next: NextFunction,
) {
  try {
    const file = req.file as Express.Multer.File
    const profileImageUrl = file.path
    const password = await encryptPassword(req.body.password)

    const authDetails = {
      uid: req.body.uid,
      email: req.body.email,
      username: req.body.username,
      password,
    } as Auth

    const auth = await createAuth(authDetails)

    if (!auth) throw new Error('User could not be created')

    const userDetails = {
      uid: req.body.uid,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      profileImageUrl,
    } as User

    const user = await createUser(userDetails)

    if (!user) throw new Error('User could not be created')

    const token = signJWT({ ...user.toJSON() }, { expiresIn: '1h' })

    return res.status(201).json({
      message: 'User created',
      user: user,
      token: token,
    })
  } catch (e) {
    deleteFolder(`uploads/users/${req.body.uid}`)
    return next(e)
  }
}

async function loginHandler(req: Request<LoginInput['body']>, res: Response, next: NextFunction) {
  try {
    const auth = res.locals.auth!

    const isEqual = await decryptPassword(req.body.password, auth.password)

    if (!isEqual) return res.status(400).json('Invalid username or password')

    const user = await getUser({ uid: auth.uid })

    if (!user) return res.status(400).json('Invalid username or password')

    const token = signJWT({ ...user.toJSON() }, { expiresIn: '1h' })

    return res.status(200).json({
      message: 'Logged in successfully',
      userId: user._id.toString(),
      uid: user.uid,
      token,
    })
  } catch (e) {
    deleteFolder(`uploads/users/${res.locals.auth!.uid}`)
    return next(e)
  }
}

async function logoutHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'] as string
    jwt.sign(authHeader, '', { expiresIn: 1 }, (_logout, err) => {
      if (err) {
        return res.status(500).json({
          message: 'Failed to logout',
        })
      }
      return res.sendStatus(200)
    })
  } catch (e) {
    return next(e)
  }
}

export { signUpHandler, loginHandler, logoutHandler }
