import { Request } from 'express'
import { FileFilterCallback } from 'multer'

import { imageMimeTypes, videoMimeTypes } from '../mimeTypes'

const imageFileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (imageMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const multimediaFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (videoMimeTypes.includes(file.mimetype) || imageMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

export { imageFileFilter, multimediaFilter }
