import { NextFunction, Request, Response } from 'express'

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
  if (res.locals.group!.admin.toString() !== res.locals.user!._id.toString())
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

function updateUser(_req: Request, res: Response, next: NextFunction) {
  if (res.locals.user!._id.toString() !== res.locals.user!._id.toString())
    return res.status(403).json('Unauthorised to update this user')

  return next()
}

function deleteUser(_req: Request, res: Response, next: NextFunction) {
  if (res.locals.user!._id.toString() !== res.locals.user!._id.toString())
    return res.status(403).json('Unauthorised to delete this user')

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
