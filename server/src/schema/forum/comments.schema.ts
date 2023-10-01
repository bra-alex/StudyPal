import { TypeOf, array, object, optional, string } from 'zod'

const commentsSchema = {
  body: object({
    postContent: string({
      required_error: 'Post content is required',
    }),
    postMedia: optional(
      array(
        object({
          mediaURL: string({
            required_error: 'Media Url is required',
          }),
        }),
      ),
    ),
  }),
}

const postParams = {
  params: object({
    postId: string({
      required_error: 'Post Id is required',
    }),
  }),
}

const commentParams = {
  params: object({
    postId: string({
      required_error: 'Post Id is required',
    }),
    commentId: string({
      required_error: 'Comment Id is required',
    }),
  }),
}

const createCommentSchema = object({
  ...postParams,
  ...commentsSchema,
})

const deleteCommentSchema = object({
  ...commentParams,
})

type CreateCommentInput = TypeOf<typeof createCommentSchema>
type DeleteCommentInput = TypeOf<typeof deleteCommentSchema>

export { createCommentSchema, deleteCommentSchema, CreateCommentInput, DeleteCommentInput }
