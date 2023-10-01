import { NextFunction, Request, Response } from 'express'

import { socketConnection } from '../sockets'
import { Comments, Posts } from '../models/dto/dto'
import { deleteFolder } from '../util/deleteFromStorage'
import { getUserById } from '../services/users/users.service'
import { CreatePostInput } from '../schema/forum/posts.schema'
import { findTopicById } from '../services/topics/topic.service'
import { CreateCommentInput } from '../schema/forum/comments.schema'
import { addComment, deleteComment } from '../services/forum/comments/comments.service'
import { createPost, deletePost, fetchAllPosts } from '../services/forum/posts/posts.service'

function generalNamespace() {
  return socketConnection.generalNamespace().io
}

type PostMedia = { mediaURL: string }[]

async function httpFetchAllPosts(_req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await fetchAllPosts()

    return res.status(200).json(posts)
  } catch (e) {
    return next(e)
  }
}

async function httpFetchPost(_req: Request, res: Response, next: NextFunction) {
  try {
    return res.status(200).json(res.locals.post!)
  } catch (e) {
    return next(e)
  }
}

async function httpCreatePost(
  req: Request<{}, {}, CreatePostInput['body']>,
  res: Response,
  next: NextFunction,
) {
  let author = res.locals.user!
  try {
    const files = req.files as Express.Multer.File[] | undefined

    const topic = await findTopicById(req.body.topic)

    if (!topic) return res.status(404).json('Selected topic does not exist')

    let postMedia: PostMedia = []

    if (files) {
      const filePaths = files.map(file => ({ mediaURL: file.path }))
      postMedia = [...filePaths]
    }

    const postDetails = {
      author,
      ...req.body,
      topic: {
        id: req.body.topic,
        name: topic.name,
      },
      postMedia,
    } as Posts

    const createdPost = await createPost(postDetails)

    author = (await getUserById(author._id))!

    author.posts = [...author.posts, createdPost]
    topic.posts = [...topic.posts, createdPost]

    await author.save()
    await topic.save()

    generalNamespace().emit('post', {
      action: 'create',
      post: {
        _id: createdPost._id,
        author: {
          name: author.name,
          username: author.username,
        },
        postContent: createdPost.postContent,
        postMedia: createdPost.postMedia,
        topic: createdPost.topic,
        comments: createdPost.comments,
        createdAt: createdPost.createdAt,
        updatedAt: createdPost.updatedAt,
        __v: createdPost.__v,
      },
    })

    return res.status(201).json(createdPost)
  } catch (e) {
    console.log(e)
    deleteFolder(`uploads/forum/posts/${author._id}`)
    return next(e)
  }
}

async function httpAddComment(
  req: Request<{}, {}, CreateCommentInput['body']>,
  res: Response,
  next: NextFunction,
) {
  try {
    const files = req.files as Express.Multer.File[] | undefined

    let postMedia: { mediaURL: string }[] = []

    if (files) {
      const filePaths = files.map(file => ({ mediaURL: file.path }))
      postMedia = [...filePaths]
    }

    const comment = {
      user: res.locals.user?._id,
      ...req.body,
      postMedia,
    } as Comments

    const createdComment = await addComment(comment)

    const post = res.locals.post!

    post.comments = [...post.comments, createdComment]

    await post.save()

    generalNamespace().emit('comment', {
      action: 'create',
      comment: createdComment,
    })

    return res.status(201).json(createdComment)
  } catch (e) {
    console.log(e)

    return next(e)
  }
}

async function httpDeletePost(_req: Request, res: Response, next: NextFunction) {
  try {
    const post = res.locals.post!

    const user = await getUserById(post.author as string)
    const topic = await findTopicById(post.topic.id as string)

    if (!user) return res.status(404).json('User not found')

    user.posts = user.posts.filter(p => {
      if (typeof p != 'string') return p._id != post._id
      return p != post._id
    })

    if (topic) {
      topic.posts = topic.posts.filter(p => {
        if (typeof p != 'string') return p._id != post._id
        return p != post._id
      })
      await topic.save()
    }

    await user.save()

    await deletePost(post._id)

    deleteFolder(`uploads/forum/posts/${post.author}/`)

    generalNamespace().emit('post', {
      action: 'delete',
      post: res.locals.post!._id,
    })

    return res.status(200).json({
      message: 'Post deleted',
    })
  } catch (e) {
    console.log(e)

    return next(e)
  }
}

async function httpDeleteComment(_req: Request, res: Response, next: NextFunction) {
  try {
    const post = res.locals.post!

    await deleteComment({ postId: post._id, commentId: res.locals.comment!._id })

    deleteFolder(`uploads/forum/posts/${post.author}/comments`)

    generalNamespace().emit('comment', {
      action: 'delete',
      comment: res.locals.comment!._id,
    })

    res.status(200).json({
      message: 'Comment deleted',
    })
  } catch (e) {
    console.log(e)

    next(e)
  }
}

export {
  httpFetchPost,
  httpCreatePost,
  httpAddComment,
  httpDeletePost,
  httpDeleteComment,
  httpFetchAllPosts,
}
