import { TypeOf, array, object, optional, string } from 'zod'

const postSchema = {
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
    topic: string({
      required_error: 'Topic is required',
    }),
    comments: optional(array(string())),
  }),
}

const postParams = {
  params: object({
    postId: string({
      required_error: 'Post Id is required',
    }),
  }),
}

const getPostSchema = object({
  ...postParams,
})

const deletePostSchema = getPostSchema

const createPostSchema = object({
  ...postSchema,
})

type GetPostInput = TypeOf<typeof getPostSchema>
type DeletePostInput = TypeOf<typeof deletePostSchema>
type CreatePostInput = TypeOf<typeof createPostSchema>

export {
  getPostSchema,
  deletePostSchema,
  createPostSchema,
  GetPostInput,
  DeletePostInput,
  CreatePostInput,
}
