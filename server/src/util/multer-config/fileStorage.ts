import fs from 'fs-extra'
import multer from 'multer'
import { Request } from 'express'
import { v4 as uuid } from 'uuid'

import { CreateUserInput } from '../../schema/users/users.schema'

type FileNameCallBack = (error: Error | null, fileName: string) => void
type DestinationCallBack = (error: Error | null, destination: string) => void

const authStorage = multer.diskStorage({
  destination: (
    req: Request<any, any, CreateUserInput['body']>,
    _file: Express.Multer.File,
    cb: DestinationCallBack,
  ) => {
    const uid = uuid()
    req.body.uid = uid
    const path = `uploads/users/${uid}/avatar`
    fs.mkdirsSync(path)

    cb(null, path)
  },
  filename: (_req: Request, file: Express.Multer.File, cb: FileNameCallBack) => {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  },
})

const postStorage = multer.diskStorage({
  destination: (req: Request, _file: Express.Multer.File, cb: DestinationCallBack) => {
    const path = `uploads/forum/posts/${req.res?.locals.user!._id}/`
    fs.mkdirsSync(path)
    cb(null, path)
  },
  filename: (_req: Request, file: Express.Multer.File, cb: FileNameCallBack) => {
    const filename = file.originalname.replace(' ', '')
    cb(null, new Date().toISOString() + '-' + filename)
  },
})

const commentStorage = multer.diskStorage({
  destination: (req: Request, _file: Express.Multer.File, cb: DestinationCallBack) => {
    const path = `uploads/forum/posts/${req.res?.locals.user?._id}/comments`
    fs.mkdirsSync(path)
    cb(null, path)
  },
  filename: (_req: Request, file: Express.Multer.File, cb: FileNameCallBack) => {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  },
})

const resourceStorage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: DestinationCallBack) => {
    const path = 'uploads/resources'
    fs.mkdirsSync(path)
    cb(null, path)
  },
  filename: (_req: Request, file: Express.Multer.File, cb: FileNameCallBack) => {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  },
})

const userStorage = multer.diskStorage({
  destination: (
    req: Request<any, any, CreateUserInput['body']>,
    _file: Express.Multer.File,
    cb: DestinationCallBack,
  ) => {
    const uid = req.body.uid ?? req.res?.locals.user?.uid
    const path = `uploads/users/${uid}/avatar`
    fs.mkdirsSync(path)
    cb(null, path)
  },
  filename: (_req: Request, file: Express.Multer.File, cb: FileNameCallBack) => {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  },
})

export { authStorage, resourceStorage, postStorage, commentStorage, userStorage }
