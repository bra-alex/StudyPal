import { TypeOf, array, object, string } from 'zod'

const topicSchema = {
  body: object({
    name: string({
      required_error: 'Topic Name is required',
    }),
    members: array(
      string({
        required_error: 'At least one member is required',
      }),
    ),
  }),
}

const params = {
  params: object({
    topicId: string({
      required_error: 'Topic Id is required',
    }),
  }),
}

const createTopicSchema = object({
  ...topicSchema,
})

const getTopicSchema = object({
  ...params,
})

const deleteTopicSchema = getTopicSchema

type CreateTopicInput = TypeOf<typeof createTopicSchema>
type GetTopicInput = TypeOf<typeof getTopicSchema>
type DeleteTopicInput = TypeOf<typeof deleteTopicSchema>

export {
  createTopicSchema,
  getTopicSchema,
  deleteTopicSchema,
  CreateTopicInput,
  GetTopicInput,
  DeleteTopicInput,
}
