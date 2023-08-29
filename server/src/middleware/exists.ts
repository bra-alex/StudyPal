import { NextFunction, Request, Response } from 'express'
import userModel from '../models/users/users.mongo'
import { getUser } from '../services/users/users.service'
import { getGroup } from '../services/groups/groups.service'
import { findTopicById } from '../services/topics/topic.service'
import { getResource } from '../services/resources/resources.service'
import { findPostById } from '../services/forum/posts/posts.service'
import { findCommentById } from '../services/forum/comments/comments.service'

async function signUpExists(req: Request, _res: Response, next: NextFunction) {
  try {
    const email = req.headers.email
    const username = req.headers.username

    const emailExists = await userModel.findOne({ email: email })
    const usernameExists = await userModel.findOne({ username: username })

    if (emailExists) {
      const e = new Error('Email already exists')
      //   e.status = 400
      throw e
    }

    if (usernameExists) {
      const e = new Error('Username already exists')
      //   e.status = 400
      throw e
    }

    return next()
  } catch (e) {
    next(e)
  }
}

async function loginExists(req: Request, res: Response, next: NextFunction) {
  try {
    const username = req.body.username

    let user = await userModel.findOne({ username: username })

    if (!user) {
      user = await userModel.findOne({ email: username })
    }

    if (!user) {
      const e = new Error('Invalid email or password')
      //   e.status = 400
      throw e
    }

    res.locals.user = user
    return next()
  } catch (e) {
    next(e)
  }
}

async function userExists(req: Request, res: Response, next: NextFunction) {
  try {
    const uid = req.params.uid

    const user = await getUser(uid)

    if (!user) {
      return res.status(400).json({
        message: 'userModel not found',
      })
    }

    res.locals.user = user
    // req.uid = uid
    return next()
  } catch (e) {
    next(e)
  }
}

async function groupExists(req: Request, res: Response, next: NextFunction) {
  try {
    const groupId = req.params.groupId

    const group = await getGroup(groupId)

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
    const topicId = req.params.topicId

    const topic = await findTopicById(topicId)

    if (!topic) {
      return res.status(404).json({
        message: 'Topic not found',
      })
    }

    res.locals.topicId = topicId
    return next()
  } catch (e) {
    next(e)
  }
}

async function resourceExists(req: Request, res: Response, next: NextFunction) {
  try {
    const resourceId = req.params.resourceId

    const resource = await getResource(resourceId)

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

async function postExists(req: Request, res: Response, next: NextFunction) {
  try {
    const postId = req.params.postId

    const post = await findPostById(postId)

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      })
    }
    res.locals.post = post
    // req.post = post
    return next()
  } catch (e) {
    next(e)
  }
}

async function commentExists(req: Request, res: Response, next: NextFunction) {
  try {
    const commentId = req.params.commentId

    const comment = await findCommentById(commentId)

    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found',
      })
    }

    res.locals.commentId = commentId
    return next()
  } catch (e) {
    next(e)
  }
}

module.exports = {
  userExists,
  postExists,
  topicExists,
  loginExists,
  groupExists,
  signUpExists,
  commentExists,
  resourceExists,
}
