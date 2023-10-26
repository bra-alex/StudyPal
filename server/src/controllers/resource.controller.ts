import { NextFunction, Request, Response } from 'express'

import { Resources, User } from '../models/dto/dto'
import { deleteFile } from '../util/deleteFromStorage'
import { CreateResourceInput } from '../schema/resources/resources.schema'

import {
  createResource,
  deleteResource,
  getAllResources,
} from '../services/resources/resources.service'

async function httpGetAllResources(_req: Request, res: Response, next: NextFunction) {
  try {
    const resources = await getAllResources()

    res.status(200).json(resources)
  } catch (e) {
    next(e)
  }
}

async function httpGetResource(_req: Request, res: Response, next: NextFunction) {
  try {
    res.download(res.locals.resource!.resourceUrl, err => {
      if (err) throw err
    })
  } catch (e) {
    next(e)
  }
}

async function httpCreateResource(
  req: Request<CreateResourceInput['body']>,
  res: Response,
  next: NextFunction,
) {
  const { filename, path } = req.file as Express.Multer.File
  try {
    const { _id } = res.locals.user as User

    const resource = {
      category: req.body.category,
      fileName: filename,
      author: _id,
      resourceUrl: path,
    } as Resources

    const createdResource = await createResource(resource)

    res.status(201).json(createdResource)
  } catch (e) {
    console.log(e)
    deleteFile(path)
    next(e)
  }
}

async function httpDeleteResource(_req: Request, res: Response, next: NextFunction) {
  try {
    deleteFile(res.locals.resource!.resourceUrl)
    await deleteResource(res.locals.resource!._id)

    res.status(200).json({
      message: 'Resource deleted',
    })
  } catch (e) {
    next(e)
  }
}

export { httpGetResource, httpGetAllResources, httpCreateResource, httpDeleteResource }
