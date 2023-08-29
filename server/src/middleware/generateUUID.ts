import { NextFunction, Request, Response } from 'express'

// import {v4 as uuid} from 'uuid'
// const uuid = require('uuid').v4

function generateUUID(_req: Request, _res: Response, next: NextFunction) {
  //   req.uid = uuid()
  next()
}

module.exports = generateUUID
