import { NextFunction, Request, Response } from 'express'

import { findAuth } from '../services/auth/auth.service'
import { getUser } from '../services/users/users.service'
import { GetUserInput } from '../schema/users/users.schema'
import { GetPostInput } from '../schema/forum/posts.schema'
import { getGroup } from '../services/groups/groups.service'
import { GetGroupInput } from '../schema/groups/groups.schema'
import { findTopicById } from '../services/topics/topic.service'
import { findPostById } from '../services/forum/posts/posts.service'
import { getResource } from '../services/resources/resources.service'
import { GetResourceInput } from '../schema/resources/resources.schema'
import { findCommentById } from '../services/forum/comments/comments.service'
import { CreateCommentInput, DeleteCommentInput } from '../schema/forum/comments.schema'

async function signUpExists(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.headers.email
    const username = req.headers.username

    const emailExists = await getUser({ email })
    const usernameExists = await getUser({ username })

    if (emailExists) return res.status(409).json('Email already exists')

    if (usernameExists) return res.status(409).json('Username already exists')

    return next()
  } catch (e) {
    next(e)
  }
}

async function loginExists(req: Request, res: Response, next: NextFunction) {
  try {
    const username = req.body.username

    let auth = await findAuth({ username })

    if (!auth) {
      auth = await findAuth({ email: username })
    }

    if (!auth) return res.status(400).json('Invalid email or password')

    res.locals.auth = auth

    return next()
  } catch (e) {
    next(e)
  }
}

async function userExists(req: Request<GetUserInput['params']>, res: Response, next: NextFunction) {
  try {
    const uid = req.params.userId

    const user = await getUser({ uid })

    if (!user)
      return res.status(400).json({
        message: 'User not found',
      })

    res.locals.user = user
    return next()
  } catch (e) {
    next(e)
  }
}

async function groupExists(
  req: Request<GetGroupInput['params']>,
  res: Response,
  next: NextFunction,
) {
  try {
    const group = await getGroup(req.params.groupId)

    if (!group) {
      return res.status(400).json({
        message: 'Group not found',
      })
    }

    res.locals.group = group
    return next()
  } catch (e) {
    next(e)
  }
}

async function topicExists(req: Request, res: Response, next: NextFunction) {
  try {
    const topic = await findTopicById(req.params.topicId)

    if (!topic) {
      return res.status(404).json({
        message: 'Topic not found',
      })
    }

    res.locals.topic = topic
    return next()
  } catch (e) {
    next(e)
  }
}

async function resourceExists(
  req: Request<GetResourceInput['params']>,
  res: Response,
  next: NextFunction,
) {
  try {
    const resource = await getResource(req.params.resourceId)

    if (!resource) {
      return res.status(404).json({
        message: 'Resource not found',
      })
    }

    res.locals.resource = resource
    return next()
  } catch (e) {
    next(e)
  }
}

async function postExists(
  req: Request<
    GetPostInput['params'] | CreateCommentInput['params'] | DeleteCommentInput['params']
  >,
  res: Response,
  next: NextFunction,
) {
  try {
    const post = await findPostById(req.params.postId)

    if (!post)
      return res.status(404).json({
        message: 'Post not found',
      })

    res.locals.post = post
    return next()
  } catch (e) {
    next(e)
  }
}

async function commentExists(
  req: Request<DeleteCommentInput['params']>,
  res: Response,
  next: NextFunction,
) {
  try {
    const comment = await findCommentById(req.params.commentId)

    if (!comment)
      return res.status(404).json({
        message: 'Comment not found',
      })

    res.locals.comment = comment

    return next()
  } catch (e) {
    next(e)
  }
}

export {
  userExists,
  postExists,
  topicExists,
  groupExists,
  loginExists,
  signUpExists,
  commentExists,
  resourceExists,
}
