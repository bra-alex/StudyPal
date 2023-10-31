import { NextFunction, Request, Response } from 'express'
import { User } from '../models/dto/dto'
import { DeleteUserInput, UpdateUserInput } from '../schema/users/users.schema'

function deletePost(_req: Request, res: Response, next: NextFunction) {
  if (res.locals.post!.author.toString() !== res.locals.user!._id.toString())
    return res.status(403).json('Unauthorised to delete this post')

  return next()
}

function deleteComment(_req: Request, res: Response, next: NextFunction) {
  if (res.locals.comment!.user.toString() !== res.locals.user!._id.toString())
    return res.status(403).json('Unauthorised to delete this comment')

  return next()
}

function deleteGroup(_req: Request, res: Response, next: NextFunction) {
  const { _id } = res.locals.group!.admin as User

  if (_id.toString() !== res.locals.user!._id.toString())
    return res.status(403).json('Unauthorised to delete this group')

  return next()
}

function deleteResource(_req: Request, res: Response, next: NextFunction) {
  if (res.locals.resource!.author.toString() !== res.locals.user!._id.toString())
    return res.status(403).json('Unauthorised to delete this resource')

  return next()
}

function deleteTopic(_req: Request, res: Response, next: NextFunction) {
  if (res.locals.topic!.creator.toString() !== res.locals.user!._id.toString())
    return res.status(403).json('Unauthorised to delete this topic')

  return next()
}

function updateUser(req: Request<UpdateUserInput['params']>, res: Response, next: NextFunction) {
  if (res.locals.user!.uid.toString() !== req.params.userId.toString())
    return res.status(403).json('Unauthorised to update this user')

  return next()
}

function deleteUser(req: Request<DeleteUserInput['params']>, res: Response, next: NextFunction) {
  console.log(res.locals.user!.uid.toString(), req.params.userId.toString())

  if (res.locals.user!.uid.toString() !== req.params.userId.toString())
    return res.status(403).json('Unauthorised to delete this user')
  // save
  return next()
}

export {
  updateUser,
  deleteUser,
  deletePost,
  deleteGroup,
  deleteTopic,
  deleteComment,
  deleteResource,
}
//
