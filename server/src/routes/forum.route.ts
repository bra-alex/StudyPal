import multer from 'multer'
import express from 'express'

import validateInput from '../middleware/validateInput'
import { postExists, commentExists } from '../middleware/exists'
import { deletePost, deleteComment } from '../middleware/isAuthorised'
import { commentStorage, multimediaFilter, postStorage } from '../util/multer.config'
import { createCommentSchema, deleteCommentSchema } from '../schema/forum/comments.schema'
import { createPostSchema, deletePostSchema, getPostSchema } from '../schema/forum/posts.schema'

import {
  httpFetchPost,
  httpCreatePost,
  httpDeletePost,
  httpAddComment,
  httpDeleteComment,
  httpFetchAllPosts,
} from '../controllers/forum.controller'

const forumRoute = express.Router()

forumRoute.get('/', httpFetchAllPosts)
forumRoute.get('/:postId', validateInput(getPostSchema), postExists, httpFetchPost)

forumRoute.post(
  '/',
  multer({ storage: postStorage, fileFilter: multimediaFilter }).array('postMedia', 4),
  validateInput(createPostSchema),
  httpCreatePost,
)

forumRoute.delete(
  '/:postId',
  validateInput(deletePostSchema),
  postExists,
  deletePost,
  httpDeletePost,
)

forumRoute.post(
  '/:postId/comment',
  multer({ storage: commentStorage, fileFilter: multimediaFilter }).array('postMedia', 4),
  validateInput(createCommentSchema),
  postExists,
  httpAddComment,
)

forumRoute.delete(
  '/:postId/comment/:commentId',
  validateInput(deleteCommentSchema),
  postExists,
  commentExists,
  deleteComment,
  httpDeleteComment,
)

export default forumRoute
